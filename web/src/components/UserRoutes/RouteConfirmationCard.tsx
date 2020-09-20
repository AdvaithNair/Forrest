import { Box, Grid, Typography, CardContent, Card } from '@material-ui/core';
import React, { useContext } from 'react';
import { ReducerContext } from '@app/common';
import { UserContext } from '../../context/context';

const ConfirmationCard = () => {
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  return (
    <Grid container alignItems='center' justify='center'>
      <Box boxShadow={8} m={6} justifyContent='center' alignItems='center'>
        <Card style={{ backgroundColor: '#DDDDDD' }}>
          <CardContent>
            <Typography variant='h5'>Current Trip</Typography>
            <Typography variant='h6'>{state.currentRoute.route}</Typography>
            <Typography variant={'body2'}>Duration</Typography>
            <Typography variant={'body2'} color={'textSecondary'}>
              {state.currentRoute.duration.toFixed(2)} min
            </Typography>
            <Typography variant={'body2'}>CO2 Savings</Typography>
            <Typography variant={'body2'} color={'textSecondary'}>
              {parseFloat(state.currentRoute.co2saved.toString()).toFixed(2)} lbs
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default ConfirmationCard;
