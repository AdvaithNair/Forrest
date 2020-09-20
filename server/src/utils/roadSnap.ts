import { MAPS_API } from '@app/common';
import axios from 'axios';

interface DataPoints {
  lat: number;
  lng: number;
}

const roadSnapRequest = async (
    pathList: Array<DataPoints>
) => {
  try {
    let pathStr = "";
    for (let item of pathList) {
      pathStr = pathStr.concat(item.lat.toString(),',',item.lng.toString(),'|')
    }
    pathStr = pathStr.slice(0, -1);
    console.log(pathStr);
    // Set Up Parameters
    const params = {
      path: pathStr,
      key: MAPS_API.KEY,
      interpolate: 'false'
    };

    // Make Request and Assign to Return Object
    const response = await axios.get(MAPS_API.SNAP_ROUTE, { params });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return { routes: {} };
  }
};

export default roadSnapRequest;
