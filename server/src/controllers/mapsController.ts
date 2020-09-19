import { Request, Response } from 'express';
import mapsRequest from '../utils/mapsRequest';
import {
  TRAFFIC_TYPES,
  AVOID_TYPES,
  FUEL_ECONOMY,
  INTERSECTION_TYPES,
  CITY_SPEEDS,
  STOP,
  IDLING
} from '@app/common';
import {
  secondsToMinutes,
  metersToMiles,
  secondsToHours
} from '../utils/conversions';
import roadSnapRequest from "../utils/roadSnap";

const TEST_INFO = {
  origin: '210 Euclid Ave, Delaware OH 43015',
  destination: '393 Waters Edge Drive, Hebron OH 43025',
  carType: 'SEDAN',
  avgHighwayOver: 3,
  avgCityOver: 0
};

interface DataPoints {
  lat: number;
  lng: number;
}

interface RouteData {
  route: string;
  efficiency: number;
  latLon?: Array<DataPoints>;
  directions?: Array<string>;
}

//Computes number of gallons used over a set distance and time from mph and mpg
const computeGallonsUsed = (
  miles: number,
  speedTravelled: number,
  milesPerGallon: number,
  avgHighwayOver: number,
  avgCityOver: number
): number => {
  //Calculate if a user is in the city or on the highway
  //This allows for us to adjust their speed based on their personal modifiers
  if (speedTravelled > CITY_SPEEDS) speedTravelled += avgHighwayOver;
  else speedTravelled += avgCityOver;

  //This data comes from the resources provided and a Taylor polynomial computed
  //to fit the curve of the MPG reduction at higher speeds
  const adjustedMilesPerGallon =
    speedTravelled > 50
      ? milesPerGallon *
        (0.0001 * speedTravelled * speedTravelled +
          -0.02888 * speedTravelled +
          2.19519)
      : milesPerGallon;

  //Return gallons used
  return miles / adjustedMilesPerGallon;
};

//This just takes into stoppage time by coming up with the average
//ratio of stop signs and stop lights
const calculateIdleGallonsUsed = (): number => {
  const gasUsed =
    (STOP.LIGHT_RATE * secondsToHours(STOP.LIGHT_TIME) +
      STOP.SIGN_RATE * secondsToHours(STOP.SIGN_TIME)) *
    IDLING;

  return gasUsed;
};

//This function processes all possible combinations of inputs of traffic
//and combines their results
const getRouteOptions = async (
  origin: string,
  destination: string,
  carType: string,
  avgHighwayOver: number,
  avgCityOver: number
) => {

  const routes: { [k: string]: any } = {};

  //Iterate through all combinations of traffic patterns and avoidances
  for (const trafficType of TRAFFIC_TYPES) {
    for (const avoidType of AVOID_TYPES) {

      //Make a request to the map with the current traffic type and avoidance
      const response = await mapsRequest(
        origin,
        destination,
        trafficType,
        avoidType
      );
      const requestRoutes = response.routes;
      let route: any;

      //Iterate through all three routes provided in the map response
      for (route of requestRoutes) {
        //Get the name of the route
        const routeName: string = route.summary;
        //If the route has not already been processed once before, we're going to
        //add all of the baseline materials
        if (!routes.hasOwnProperty(routeName)) {
          //This is a try statement because longer routes may not have a
          //'duration_in_traffic'
          try {
            routes[routeName] = {
              count: 1, //number of times we've seen this result
              estimatedTimeWithTraffic: secondsToMinutes(
                route['legs'][0]['duration_in_traffic']['value']
              ), //Convert the seconds of the whole route with traffic into a minute double
              estimatedTime: secondsToMinutes(
                route['legs'][0]['duration']['value']
              ), //Convert the seconds of the whole route without traffic into a minute double
              distance: metersToMiles(route['legs'][0]['distance']['value']),
              fuelConsumption: 0, //Start assuming 0 fuel use
              latLon: [{lat: route['legs'][0]['steps'][0]['start_location']['lat'], lng:route['legs'][0]['steps'][0]['start_location']['lng']}],
              directions: []
            };
          } catch (error) {
            //console.log(error);
            routes[routeName] = {
              count: 1,
              estimatedTimeWithTraffic: secondsToMinutes(
                route['legs'][0]['duration']['value']
              ),
              estimatedTime: secondsToMinutes(
                route['legs'][0]['duration']['value']
              ),
              distance: metersToMiles(route['legs'][0]['distance']['value']),
              fuelConsumption: 0,
              latLon: [{lat: route['legs'][0]['steps'][0]['start_location']['lat'], lng:route['legs'][0]['steps'][0]['start_location']['lng']}],
              directions: []
            };
          }
        } else { //This code runs if the route has already been established in the dict in another loop
          routes[routeName]['count'] += 1;
          try {
            routes[routeName]['estimatedTimeWithTraffic'] += secondsToMinutes(
              route['legs'][0]['duration_in_traffic']['value']
            );
          } catch (error) {
            routes[routeName]['estimatedTimeWithTraffic'] += secondsToMinutes(
              route['legs'][0]['duration']['value']
            );
          }
        }

        let step: any;
        //For each segment of the route, iterate through
        //1 segment is one straightaway without any turns/merges/etc
        for (step of route['legs'][0]['steps']) {
          //Compute the amount of gas used on this segment based on distance and time
          routes[routeName]['fuelConsumption'] += computeGallonsUsed(
            metersToMiles(step['distance']['value']),
            secondsToHours(step['duration']['value']),
            (FUEL_ECONOMY as any)[carType],
            avgHighwayOver,
            avgCityOver
          );

          if (routes[routeName]['count'] == 1) {
            routes[routeName]['latLon'].push({lat: step['end_location']['lat'], lng:step['end_location']['lng']})
            routes[routeName]['directions'].push(step['html_instructions'])
            //console.log(step['html_instructions'])
          }

          try {
            //If the end intersection is a stop of some form, add a gas use penalty
            if (INTERSECTION_TYPES.includes(step['maneuver'])) {
              routes[routeName][
                'fuelConsumption'
              ] += calculateIdleGallonsUsed();
            }
          } catch (error) {
            //console.log(error);
            continue;
          }
        }
      }
    }
  }
  //Go through each route that has been processed
  for (let item in routes) {
    //Take the average of the time in traffic and the fuel consumption
    routes[item]['estimatedTimeWithTraffic'] /= routes[item]['count'];
    routes[item]['fuelConsumption'] /= routes[item]['count'];

    //Create an average of fuel consumed in segments and the fuel consumed as an
    //estimation based on overall time and mileage (to ensure traffic is accounted for)
    routes[item]['fuelConsumption'] =
      (routes[item]['fuelConsumption'] +
        computeGallonsUsed(
          routes[item]['distance'],
          routes[item]['estimatedTimeWithTraffic'],
          (FUEL_ECONOMY as any)[carType],
          avgHighwayOver,
          avgCityOver
        )) /
      2;
  }
  //console.log(routes)
  return routes;
};

//This function processes the routes
export const getBestRoutes = async (_req: Request, res: Response) => {
  try {
    //Get the routes
    const routes = await getRouteOptions(
        TEST_INFO.origin,
        TEST_INFO.destination,
        TEST_INFO.carType,
        TEST_INFO.avgHighwayOver,
        TEST_INFO.avgCityOver
    );

    //Establish variables
    let slowestRoute: RouteData = { route: '', efficiency: 0 };
    let fastestRoute: RouteData = { route: '', efficiency: 10000 };
    let worstEfficiency: RouteData = { route: '', efficiency: 0 };
    let bestEfficiency: RouteData = { route: '', efficiency: 10000 };
    //console.log(routes);
    let route: any;
    //console.log(Object.keys(routes));
    for (route in routes) {
      //Check to see if the current route is better/worse than the ones
      //established in the variables above
      if (
        (routes as any)[route]['estimatedTimeWithTraffic'] >
        slowestRoute.efficiency
      )
        slowestRoute = {
          route,
          efficiency:
            (Math.round((routes as any)[route]['estimatedTimeWithTraffic']*100)) /
            100
        };
      if (
        (routes as any)[route]['estimatedTimeWithTraffic'] <
        fastestRoute.efficiency
      )
        fastestRoute = {
          route,
          efficiency:
            (Math.round((routes as any)[route]['estimatedTimeWithTraffic'] * 100)
              ) /
            100
        };
      if (
        (routes as any)[route]['fuelConsumption'] > worstEfficiency.efficiency
      )
        worstEfficiency = {
          route,
          efficiency:
            (Math.round((routes as any)[route]['fuelConsumption'] *100 )) /
            100
        };
      if ((routes as any)[route]['fuelConsumption'] < bestEfficiency.efficiency)
        bestEfficiency = {
          route,
          efficiency:
            (Math.round((routes as any)[route]['fuelConsumption']*100)) /
            100
        };
    }

    let newArrayEfficiency = [];
    const snappedDictEfficiency = await roadSnapRequest(routes[bestEfficiency.route]['latLon']);
    for (let item of snappedDictEfficiency['snappedPoints']) {
      newArrayEfficiency.push({lat: item['location']['latitude'], lng:item['location']['longitude']})
    }
    bestEfficiency.latLon = newArrayEfficiency;
    bestEfficiency.directions = routes[bestEfficiency.route]['directions'];

    let newArrayFastest = [];
    const snappedDictFastest = await roadSnapRequest(routes[fastestRoute.route]['latLon']);
    for (let item of snappedDictFastest['snappedPoints']) {
      newArrayFastest.push({lat: item['location']['latitude'], lng:item['location']['longitude']})
    }
    fastestRoute.latLon = newArrayFastest;
    fastestRoute.directions = routes[fastestRoute.route]['directions']

    const efficiency = {
      slowestRoute,
      fastestRoute,
      worstEfficiency,
      bestEfficiency
    };

    res.json(efficiency);
  } catch {
    res.status(400).json({ error: 'Something went wrong' });
  }
};

export const test = async (_req: Request, res: Response) => {
  try {
    // Traffic Types According to Google Maps API
    const trafficTypes = ['best_guess', 'pessimistic', 'optimistic'];

    // Road Types to Avoid
    const avoidTypes = [null, 'highways'];

    const routes = await mapsRequest(
      TEST_INFO.origin,
      TEST_INFO.destination,
      trafficTypes[0],
      avoidTypes[0]
    );
          
    console.log(routes);

    res.json(routes);
  } catch {
    res.json({ error: 'Error' });
  }
};
