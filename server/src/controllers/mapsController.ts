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

const TEST_INFO = {
  origin: '210 Euclid Ave, Delaware OH 43015',
  destination: '393 Waters Edge Drive, Hebron OH 43025',
  carType: 'SEDAN',
  avgHighwayOver: 3,
  avgCityOver: 0
};

interface RouteData {
  route: string;
  efficiency: number;
}

const computeGallonsUsed = (
  miles: number,
  speedTravelled: number,
  milesPerGallon: number,
  avgHighwayOver: number,
  avgCityOver: number
): number => {
  if (speedTravelled > CITY_SPEEDS) speedTravelled += avgHighwayOver;
  else speedTravelled += avgCityOver;

  const adjustedMilesPerGallon =
    speedTravelled > 50
      ? milesPerGallon *
        (0.0001 * speedTravelled * speedTravelled +
          -0.02888 * speedTravelled +
          2.19519)
      : milesPerGallon;

  return miles / adjustedMilesPerGallon;
};

const calculateIdleGallonsUsed = (): number => {
  const gasUsed =
    (STOP.LIGHT_RATE * secondsToHours(STOP.LIGHT_TIME) +
      STOP.SIGN_RATE * secondsToHours(STOP.SIGN_TIME)) *
    IDLING;

  return gasUsed;
};

const getRouteOptions = async (
  origin: string,
  destination: string,
  carType: string,
  avgHighwayOver: number,
  avgCityOver: number
) => {
  const routes: { [k: string]: any } = {};

  for (const trafficType in TRAFFIC_TYPES) {
    for (const avoidType in AVOID_TYPES) {
      const response = await mapsRequest(
        origin,
        destination,
        trafficType,
        avoidType
      );
      const requestRoutes = response.routes;
      let route: any;
      for (route in requestRoutes) {
        const routeName: string = route.summary;

        if (!routes.hasOwnProperty(routeName)) {
          try {
            routes[routeName] = {
              count: 1,
              estimatedTimeWithTraffic: secondsToMinutes(
                route['legs'][0]['duration_in_traffic']['value']
              ),
              estimatedTime: secondsToMinutes(
                route['legs'][0]['duration']['value']
              ),
              distance: metersToMiles(route['legs'][0]['distance']['value']),
              fuelConsumption: 0
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
              fuelConsumption: 0
            };
          }
        } else {
          routes[routeName]['count'] += 1;
          try {
            routes[routeName]['estimatedTimeWithTraffic'] += secondsToMinutes(
              route['legs'][0]['duration_in_traffic']['value']
            );
          } catch (error) {
            //console.log(error);
            routes[routeName]['estimatedTimeWithTraffic'] += secondsToMinutes(
              route['legs'][0]['duration']['value']
            );
          }
        }

        let step: any;
        for (step in route['legs'][0]['steps']) {
          routes[routeName]['fuelConsumption'] += computeGallonsUsed(
            metersToMiles(step['distance']['value']),
            secondsToHours(step['duration']['value']),
            (FUEL_ECONOMY as any)[carType],
            avgHighwayOver,
            avgCityOver
          );
          try {
            if (step['maneuver'] in INTERSECTION_TYPES) {
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
  for (let item in routes) {
    routes[item]['estimatedTimeWithTraffic'] /= routes[item]['count'];
    routes[item]['fuelConsumption'] /= routes[item]['count'];

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
  return routes;
};

export const getBestRoutes = async (_req: Request, res: Response) => {
  try {
    const routes = getRouteOptions(
      TEST_INFO.origin,
      TEST_INFO.destination,
      TEST_INFO.carType,
      TEST_INFO.avgHighwayOver,
      TEST_INFO.avgCityOver
    );
    let slowestRoute: RouteData = { route: '', efficiency: 0 };
    let fastestRoute: RouteData = { route: '', efficiency: 0 };
    let worstEfficiency: RouteData = { route: '', efficiency: 0 };
    let bestEfficiency: RouteData = { route: '', efficiency: 0 };

    let route: any;
    for (route in routes) {
      if (
        (routes as any)[route]['estimatedTimeWithTraffic'] >
        slowestRoute.efficiency
      )
        slowestRoute = {
          route,
          efficiency:
            (Math.round((routes as any)[route]['estimatedTimeWithTraffic']) *
              100) /
            100
        };
      if (
        (routes as any)[route]['estimatedTimeWithTraffic'] <
        fastestRoute.efficiency
      )
        fastestRoute = {
          route,
          efficiency:
            (Math.round((routes as any)[route]['estimatedTimeWithTraffic']) *
              100) /
            100
        };
      if (
        (routes as any)[route]['fuelConsumption'] > worstEfficiency.efficiency
      )
        worstEfficiency = {
          route,
          efficiency:
            (Math.round((routes as any)[route]['estimatedTimeWithTraffic']) *
              100) /
            100
        };
      if ((routes as any)[route]['fuelConsumption'] < bestEfficiency.efficiency)
        bestEfficiency = {
          route,
          efficiency:
            (Math.round((routes as any)[route]['estimatedTimeWithTraffic']) *
              100) /
            100
        };
    }

    const efficiency = {
      slowestRoute,
      fastestRoute,
      worstEfficiency,
      bestEfficiency
    };

    res.json(efficiency);
  } catch {
    res.status(400).json({ error: 'somethign went worong' });
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
