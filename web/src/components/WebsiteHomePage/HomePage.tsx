import { ReducerContext } from '@app/common';
import { Divider, Grid, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useContext } from 'react';
import { UserContext } from '../../context/context';
import Blurb from '../General/Misc/Blurb';
import {clearLoading, setLoading} from "../../context/loading";
import STATE from "../../context/state";


const HomePage = () => {
  const { state, dispatch } = useContext<ReducerContext>(UserContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const startApp = () => {
      setLoading(dispatch);
      dispatch({
          type: STATE.VIEW_WEB_APP
      });
      clearLoading(dispatch);
  };

  return (
    <Box boxShadow={4} bgcolor='background.paper' m={2} p={3} borderRadius={8}>
      <Blurb headerText={'Test'} dataText={'Test2'}/>
        <Button variant="outlined" onClick={startApp}>Go to App</Button>
    </Box>
  );
};

export default HomePage;
