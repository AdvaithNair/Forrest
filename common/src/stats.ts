// Miles Per Gallon/Charge for Vehicle Types
export const FUEL_ECONOMY = {
  SEDAN: 24.2,
  HYBRID_SEDAN: 47.3,
  TRUCK: 17.5,
  VAN: 17.5,
  SUV: 17.5,
  MOTORCYCLE: 44.0,
  ELECTRIC: 225 // Miles Per Charge
};

// Rates and Times for Stop
export const STOP = {
  SIGN_RATE: 0.7,
  SIGN_TIME: 4,
  LIGHT_RATE: 0.3,
  LIGHT_TIME: 55
};

export const CO2EMISSIONS = {
  GAS: 20,
  ELECTRIC: 52
};

// Idling Variable
export const IDLING: number = 0.5;

// City Speed Average
export const CITY_SPEEDS: number = 45;

// Traffic Types According to Google Maps API
export const TRAFFIC_TYPES = ['best_guess', 'pessimistic', 'optimistic'];

// Road Types to Avoid
export const AVOID_TYPES = [null, 'highways'];

// Types of Intersections According to Google Maps API
export const INTERSECTION_TYPES = [
  'turn-slight-left',
  'turn-sharp-left',
  'turn-left',
  'turn-slight-right',
  'turn-sharp-right',
  'turn-right'
];
