import React, {useContext, useEffect, useState} from 'react';
import { Button, Grid } from '@material-ui/core';
import {
  CRYPTO_JS_SECRETS,
  ERRORS,
  LOCALSTORAGE,
  ReducerContext
} from '@app/common';
import { UserContext } from '../../context/context';
import axios from '../../utils/axios';
import CryptoJS from 'crypto-js';
import { clearLoading, setLoading } from '../../context/loading';
import STATE from '../../context/state';
import CustomSnackbar from '../General/Utility/Snackbar';
import SmallPassword from '../General/Entry/PasswordSmall';
import TextEntry from "../General/Entry/TextEntry";
import Blurb from "../General/Misc/Blurb";


interface Props {
  onArrival: any;
  dataFound: boolean;
}

interface RouteInfo {
  bestEfficiency: routeBreakdown;
  worstEfficiency: routeBreakdown;
  fastestRoute: routeBreakdown;
  slowestRoute: routeBreakdown;
}

interface routeBreakdown {
  route: string;
  efficiency: number
}

const RouteSelector: React.FC<Props> = ({onArrival, dataFound}) =>{
  const { dispatch } = useContext<ReducerContext>(UserContext);

  const [open, setOpen] = useState<string>('');

  const [input, setInput] = useState<RouteInfo>({
    bestEfficiency: {
      route: 'none',
      efficiency: -1
    },
    worstEfficiency: {
      route: 'none',
      efficiency: -1
    },
    fastestRoute: {
      route: 'none',
      efficiency: -1
    },
    slowestRoute: {
      route: 'none',
      efficiency: -1
    }
  });

  const handleSubmit = () => {
    console.log("Submitting form")
  }

  useEffect(() =>  {
    console.log("Getting map API");
    axios
        .get('/api/maps/routes')
        .then((res: any) => {
          // Set State Here
          onArrival();
          console.log(res.data);
          setInput({
            bestEfficiency: res.data.bestEfficiency,
            worstEfficiency: res.data.worstEfficiency,
            fastestRoute: res.data.fastestRoute,
            slowestRoute: res.data.slowestRoute,
          })

        })
        .catch((error: any) => {
          console.log(error);
        });
  }, [dataFound]);

  return (
    <div>
      <Blurb headerText={"Fastest"} dataText={input.fastestRoute.route}/>
      <Blurb headerText={"Best Efficiency"} dataText={input.bestEfficiency.route}/>
    </div>
  );
};

export default RouteSelector;
