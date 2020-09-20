import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Box, Button, Grid, Typography} from '@material-ui/core';
import {CAR_TYPES, CO2EMISSIONS, COLORS, ReducerContext} from '@app/common';
import {UserContext} from '../../context/context';
import axios from '../../utils/axios';
import Blurb from "../General/Misc/Blurb";
import BasicMap from "./mapComponent";
import EcoIcon from '@material-ui/icons/Eco';
import SpeedIcon from '@material-ui/icons/Speed';
import DirectionBar from "./directionsBar";
import {clearLoading, setLoading} from "../../context/loading";
import STATE from "../../context/state";

interface Props {
    onArrival: any;
    dataFound: boolean;
    start: string;
    end: string;
}

interface RouteInfo {
    bestEfficiency: routeBreakdown;
    worstEfficiency: routeBreakdown;
    fastestRoute: routeBreakdown;
    slowestRoute: routeBreakdown;
}

interface routeBreakdown {
    route: string;
    fuelEfficiency: number;
    duration: number;
    latLon?: Array<DataPoints>;
    directions?: Array<string>;
}

interface DataPoints {
    lat: number;
    lng: number;
}

const RouteSelector: React.FC<Props> = ({onArrival, dataFound, start, end}) => {
    const {state, dispatch} = useContext<ReducerContext>(UserContext);

    const [open, setOpen] = useState<string>('');
    const [ecoRoute, setEcoRoute] = useState<boolean>(true);
    const [directionIndex, setDirectionIndex] = useState<number>(0);

    const useEco = () => {
        setDirectionIndex(0);
        setEcoRoute(true);
        setLoading(dispatch);
        dispatch({
            type: STATE.SET_CURRENT_ROUTE,
            payload: {
                route: input.bestEfficiency.route,
                co2saved: (Math.abs(input.fastestRoute.fuelEfficiency - input.bestEfficiency.fuelEfficiency) * (state.user.carType == CAR_TYPES.ELECTRIC ? CO2EMISSIONS.ELECTRIC : CO2EMISSIONS.GAS)).toFixed(2),
                duration: input.bestEfficiency.duration,
                startingLoc: input.bestEfficiency.latLon![0],
                endingLoc: input.bestEfficiency.latLon![input.bestEfficiency.latLon!.length-1]
            }
        });
        clearLoading(dispatch);
    };

    const useFast = () => {
        setDirectionIndex(0);
        setEcoRoute(false);
        setLoading(dispatch);
        dispatch({
            type: STATE.SET_CURRENT_ROUTE,
            payload: {
                route: input.fastestRoute.route,
                co2saved: 0,
                duration: input.fastestRoute.duration,
                startingLoc: input.fastestRoute.latLon![0],
                endingLoc: input.fastestRoute.latLon![input.fastestRoute.latLon!.length-1]
            }
        });
        clearLoading(dispatch);
    };

    const [input, setInput] = useState<RouteInfo>({
        bestEfficiency: {
            route: 'none',
            duration: -1,
            fuelEfficiency: -1,
            latLon: [],
            directions: []
        },
        worstEfficiency: {
            route: 'none',
            duration: -1,
            fuelEfficiency: -1,
        },
        fastestRoute: {
            route: 'none',
            duration: -1,
            fuelEfficiency: -1,
            latLon: [],
            directions: []
        },
        slowestRoute: {
            route: 'none',
            duration: -1,
            fuelEfficiency: -1,
        }
    });

    const directionForward = () => {
        setDirectionIndex(directionIndex + 1)
    }

    const directionBackward = () => {
        setDirectionIndex(directionIndex - 1)
    }

    const handleSubmit = () => {
        console.log("Submitting form")
    };

    useEffect(() => {
        axios
            .get('/api/maps/routes', {
                params: {
                    start: start,
                    end: end
                }
            })
            .then((res: any) => {
                setLoading(dispatch);
                dispatch({
                    type: STATE.CLEAR_CURRENT_ROUTE
                });
                clearLoading(dispatch);
                // Set State Here
                onArrival();
                console.log(res.data);
                setInput({
                    bestEfficiency: res.data.bestEfficiency,
                    worstEfficiency: res.data.worstEfficiency,
                    fastestRoute: res.data.fastestRoute,
                    slowestRoute: res.data.slowestRoute,
                })

            })
            .catch((error: any) => {
                console.log(error);
            });
    }, [dataFound]);

    return (
        <div>
            <Grid
                container
                direction='row'
                justify='space-around'
                alignItems='center'
            >
                <Grid item md>
                    <Grid container
                          direction="column"
                          justify="center"
                          alignItems="center"
                    >
                        <Button onClick={useFast}>
                            <Box width={250}>
                                <Grid container
                                      direction="column"
                                      justify="center"
                                      alignItems="center"
                                >
                                    <Avatar style={{
                                        "backgroundColor": ecoRoute ? 'grey' : 'orange'
                                    }} variant="rounded">
                                        <SpeedIcon/>
                                    </Avatar>
                                    <Typography variant='h6'>Fastest</Typography>
                                    <Typography variant='body2'>{input.fastestRoute.route}</Typography>
                                    <Typography variant={'body2'} color={'textSecondary'}>
                                        Duration: {input.fastestRoute.duration.toFixed(2)} minutes
                                    </Typography>
                                    <Typography variant={'body2'} color={'textSecondary'}>
                                        CO2
                                        Savings: {(input.fastestRoute.fuelEfficiency - input.fastestRoute.fuelEfficiency).toFixed(2)}
                                    </Typography>
                                </Grid>
                            </Box>
                        </Button>
                        <Button onClick={useEco}>
                            <Box width={250}>
                                <Grid container
                                      direction="column"
                                      justify="center"
                                      alignItems="center"
                                >
                                    <Avatar style={{"backgroundColor": ecoRoute ? COLORS.SECONDARY : 'grey'}}
                                            variant="rounded">
                                        <EcoIcon/>
                                    </Avatar>
                                    <Typography variant='h6'>Best Efficiency</Typography>
                                    <Typography variant='body2'>{input.bestEfficiency.route}</Typography>
                                    <Typography variant={'body2'} color={'textSecondary'}>
                                        Duration: {input.bestEfficiency.duration.toFixed(2)} minutes
                                    </Typography>
                                    <Typography variant={'body2'} color={'textSecondary'}>
                                        CO2
                                        Savings: {(Math.abs(input.fastestRoute.fuelEfficiency - input.bestEfficiency.fuelEfficiency) * (state.user.carType == CAR_TYPES.ELECTRIC ? CO2EMISSIONS.ELECTRIC : CO2EMISSIONS.GAS)).toFixed(2)}
                                    </Typography>
                                </Grid>
                            </Box>
                        </Button>

                    </Grid>
                </Grid>
                <Grid item sm>
                    <DirectionBar currentDirection={directionIndex}
                                  directionList={ecoRoute ? input.bestEfficiency.directions : input.fastestRoute.directions}
                                  onForward={directionForward} onBackward={directionBackward}/>
                    <BasicMap ecoMode={ecoRoute}
                              currentDirection={directionIndex}
                              polySet={ecoRoute ? input.bestEfficiency.latLon : input.fastestRoute.latLon}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default RouteSelector;
