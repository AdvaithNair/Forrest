import { MAPS_API } from '@app/common';
import axios from 'axios';

const mapsRequest = async (
  origin: string,
  destination: string,
  traffic_model: string = 'best_guess',
  avoid: string | null = null
) => {
  try {
    // Set Up Parameters
    const params = {
      origin,
      destination,
      avoid,
      traffic_model,
      key: MAPS_API.KEY,
      mode: 'driving',
      alternatives: 'true',
      departure_time: 'now'
    };

    // Make Request and Assign to Return Object
    const response = await axios.get(MAPS_API.ROUTE, { params });

    return response.data;
  } catch (error) {
    console.log(error);
    return { routes: {} };
  }
};

export default mapsRequest;
