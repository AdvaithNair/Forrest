import { ReducerContext } from '@app/common';
import { Divider, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useContext } from 'react';
import { UserContext } from '../../context/context';
import Blurb from '../General/Misc/Blurb';



const ResourcesBox = () => {
  const { state, dispatch } = useContext<ReducerContext>(UserContext);


  return (
    <Box boxShadow={4} bgcolor='background.paper' m={2} p={3} borderRadius={8}>
      <Grid
        container
        direction='row'
        justify='space-around'
        alignItems='center'
      >
        <Grid item sm>
          <Blurb headerText={"Section"} dataText={"Placeholder"}/>
        </Grid>
        <Grid item sm>
            <Blurb headerText={"Section"} dataText={"Placeholder"}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResourcesBox;
