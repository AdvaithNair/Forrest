import React, { useContext, useState } from 'react';
import {Box, Button, Grid, LinearProgress} from '@material-ui/core';
import {
  CRYPTO_JS_SECRETS,
  ERRORS,
  LOCALSTORAGE,
  ReducerContext,
  COLORS
} from '@app/common';
import { UserContext } from '../../context/context';
import axios from '../../utils/axios';
import CryptoJS from 'crypto-js';
import { clearLoading, setLoading } from '../../context/loading';
import STATE from '../../context/state';
import CustomSnackbar from '../General/Utility/Snackbar';
import SmallPassword from '../General/Entry/PasswordSmall';
import TextEntry from "../General/Entry/TextEntry";
import CO2FactCard from "./CO2FactCard";

interface Props {
  onEditStart: any;
  onEditEnd: any;
}


const RouteCalculationForm: React.FC<Props> = ({onEditStart, onEditEnd}) =>{
  const { dispatch } = useContext<ReducerContext>(UserContext);

  const [routesFound, setRoutesFound] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log("Submitting form")
  }

  return (
      <Box m={2} display={routesFound ? 'none' : 'block'}>
        <LinearProgress />
        <CO2FactCard />
      </Box>
  );
};

export default RouteCalculationForm;
