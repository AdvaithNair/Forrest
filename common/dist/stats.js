"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTERSECTION_TYPES = exports.AVOID_TYPES = exports.TRAFFIC_TYPES = exports.CITY_SPEEDS = exports.IDLING = exports.STOP = exports.FUEL_ECONOMY = void 0;
exports.FUEL_ECONOMY = {
    SEDAN: 24.2,
    HYBRID_SEDAN: 47.3,
    TRUCK: 17.5,
    VAN: 17.5,
    SUV: 17.5,
    MOTORCYCLE: 44.0,
    ELECTRIC: 225
};
exports.STOP = {
    SIGN_RATE: 0.7,
    SIGN_TIME: 4,
    LIGHT_RATE: 0.3,
    LIGHT_TIME: 55
};
exports.IDLING = 0.5;
exports.CITY_SPEEDS = 45;
exports.TRAFFIC_TYPES = ['best_guess', 'pessimistic', 'optimistic'];
exports.AVOID_TYPES = [null, 'highways'];
exports.INTERSECTION_TYPES = [
    'turn-slight-left',
    'turn-sharp-left',
    'turn-left',
    'turn-slight-right',
    'turn-sharp-right',
    'turn-right'
];
//# sourceMappingURL=stats.js.map