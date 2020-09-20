import {Box, Grid, Typography} from "@material-ui/core";
import React, {useContext} from "react";
import {ReducerContext} from "@app/common";
import {UserContext} from "../../context/context";


const ConfirmationCard = () => {
    const {state, dispatch} = useContext<ReducerContext>(UserContext);

    return (
        <Grid container
              alignItems='center'
              justify='center'>
    <Box height={250} width={250} borderRadius={10} boxShadow={8} m={6} style={{ backgroundColor: '#DDDDDD' }}>
        <Typography variant='h5'>Current Trip:</Typography>
        <Typography variant='body2'>Title - {state.currentRoute.route}</Typography>
        <Typography variant={'body2'} color={'textSecondary'}>
            Approx. duration: {state.currentRoute.duration}
        </Typography>
        <Typography variant={'body2'} color={'textSecondary'}>
            CO2 Savings: {state.currentRoute.co2saved}
        </Typography>
    </Box>
        </Grid>
    );
}

export default ConfirmationCard;