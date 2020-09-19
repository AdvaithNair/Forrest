import React, {useContext, useState} from 'react';
import {Box, LinearProgress} from '@material-ui/core';
import {ReducerContext} from '@app/common';
import {UserContext} from '../../context/context';
import axios from '../../utils/axios';
import CO2FactCard from "./CO2FactCard";
import RouteSelector from "./RouteSelector";

interface Props {
    onEditStart: any;
    onEditEnd: any;
}


const RouteCalculationForm: React.FC<Props> = ({onEditStart, onEditEnd}) => {
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
                <RouteSelector onArrival={routesWereFound} dataFound={routesFound}/>
            </Box>
        </div>
    );
};

export default RouteCalculationForm;
