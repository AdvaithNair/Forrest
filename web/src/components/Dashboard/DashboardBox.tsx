import {CARBON_SAVINGS, COLORS, ReducerContext} from '@app/common';
import {Divider, Grid} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, {useContext} from 'react';
import {UserContext} from '../../context/context';
import SmallDataCard from "./SmallDataCard";
import SmallTextCard from "./SmallTextCard";
import CO2Statistics from "./Segments/CO2Statistics";
import DrivingConstants from "./Segments/DrivingConstants";

const DashboardBox = () => {
    const {state, dispatch} = useContext<ReducerContext>(UserContext);

    console.log(state.user)

    return (
        <Box boxShadow={4} bgcolor='background.paper' m={2} p={3} borderRadius={8}>
            <CO2Statistics/>
            <Box m={2}>
                <Divider />
            </Box>
            <DrivingConstants/>
        </Box>
    );
};

export default DashboardBox;
