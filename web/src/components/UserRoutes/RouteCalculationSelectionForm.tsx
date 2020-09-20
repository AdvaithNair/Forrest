import React, {useContext, useState} from 'react';
import {Box, LinearProgress} from '@material-ui/core';
import {ReducerContext} from '@app/common';
import {UserContext} from '../../context/context';
import axios from '../../utils/axios';
import CO2FactCard from "./CO2FactCard";
import RouteSelector from "./RouteSelector";

interface Props {
    start: string;
    end: string;
}


const RouteCalculationForm: React.FC<Props> = ({ start, end}) => {
    const {dispatch} = useContext<ReducerContext>(UserContext);

    const [routesFound, setRoutesFound] = useState<boolean>(false);

    const routesWereFound = () => {
      setRoutesFound(true);
    }

    return (
        <div>
            <Box m={2} display={routesFound ? 'none' : 'block'}>
                <LinearProgress/>
                <CO2FactCard/>
            </Box>
            <Box m={2} display={routesFound ? 'block' : 'none'}>
                <RouteSelector start={start} end={end} onArrival={routesWereFound} dataFound={routesFound}/>
            </Box>
        </div>
    );
};

export default RouteCalculationForm;
