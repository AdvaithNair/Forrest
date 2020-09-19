import { MAPS_API } from '@app/common';
import axios, { AxiosResponse } from 'axios';

const mapsRequest = async (
  origin: string,
  destination: string,
  trafficGuess: string = 'best_guess',
  avoid: string | null = null
) => {
  const params = {
    origin,
    destination,
    avoid,
    key: MAPS_API.KEY,
    mode: 'driving',
    alternatives: 'true',
    departure_time: 'now',
    traffic_model: trafficGuess
  };

  axios.get(MAPS_API.ROUTE, { params }).then((res: AxiosResponse) => {
    console.log(res.data);
  });
};

export default mapsRequest;
