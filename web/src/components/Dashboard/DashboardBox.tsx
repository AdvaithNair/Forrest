import { ReducerContext } from '@app/common';
import { Divider, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useContext } from 'react';
import { UserContext } from '../../context/context';
import Blurb from '../General/Misc/Blurb';
import SmallDataCard from "./SmallDataCard";

const DashboardBox = () => {
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  console.log(state.user)

  return (
    <Box boxShadow={4} bgcolor='background.paper' m={2} p={3} borderRadius={8}>
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='flex-start'
      >
        <SmallDataCard data={1} max={100} title={"Trees Planted"} icon={''} iconBackground={''} unit={'trees'} barUnit={'trees'}/>
      </Grid>
    </Box>
  );
};

export default DashboardBox;
