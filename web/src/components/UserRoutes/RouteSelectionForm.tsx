import React, { useContext, useState } from 'react';
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


interface Props {
  onEditStart: any;
  onEditEnd: any;
}

const RouteSelectionForm: React.FC<Props> = ({onEditStart, onEditEnd}) =>{
  const { dispatch } = useContext<ReducerContext>(UserContext);

  const [open, setOpen] = useState<string>('');

  const handleSubmit = () => {
    console.log("Submitting form")
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='center'
      >
        <TextEntry onChange={onEditStart} helperText={'Put your current/starting location'} label={'Start'} required={true} fullWidth={true} error={false}/>
        <TextEntry onChange={onEditEnd} helperText={'Put your ending location'} label={'End'} required={true} fullWidth={true} error={false}/>
      </Grid>
    </form>
  );
};

export default RouteSelectionForm;
