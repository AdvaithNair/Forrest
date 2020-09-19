import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Box, Button, Grid} from '@material-ui/core';
import {COLORS, ReducerContext} from '@app/common';
import {UserContext} from '../../context/context';
import axios from '../../utils/axios';
import Blurb from "../General/Misc/Blurb";
import BasicMap from "./mapComponent";
import EcoIcon from '@material-ui/icons/Eco';
import SpeedIcon from '@material-ui/icons/Speed';
import DirectionBar from "./directionsBar";

interface Props {
    onArrival: any;
    dataFound: boolean;
}

interface RouteInfo {
    bestEfficiency: routeBreakdown;
    worstEfficiency: routeBreakdown;
    fastestRoute: routeBreakdown;
    slowestRoute: routeBreakdown;
}

interface routeBreakdown {
    route: string;
    efficiency: number;
    latLon?: Array<DataPoints>;
    directions?: Array<string>;
}

interface DataPoints {
    lat: number;
    lng: number;
}

const RouteSelector: React.FC<Props> = ({onArrival, dataFound}) => {
    const {dispatch} = useContext<ReducerContext>(UserContext);

    const [open, setOpen] = useState<string>('');
    const [ecoRoute, setEcoRoute] = useState<boolean>(true);
    const [directionIndex, setDirectionIndex] = useState<number>(0);

    const useEco = () => {
        setDirectionIndex(0);
        setEcoRoute(true);
    };

    const useFast = () => {
        setDirectionIndex(0);
        setEcoRoute(false);
    };

    const [input, setInput] = useState<RouteInfo>({
        bestEfficiency: {
            route: 'none',
            efficiency: -1,
            latLon: [],
            directions: []
        },
        worstEfficiency: {
            route: 'none',
            efficiency: -1
        },
        fastestRoute: {
            route: 'none',
            efficiency: -1,
            latLon: [],
            directions: []
        },
        slowestRoute: {
            route: 'none',
            efficiency: -1
        }
    });

  const directionForward = () => {
    setDirectionIndex(directionIndex+1)
  }

  const directionBackward = () => {
    setDirectionIndex(directionIndex-1)
  }

    const handleSubmit = () => {
        console.log("Submitting form")
    }

    useEffect(() => {
        axios
            .get('/api/maps/routes')
            .then((res: any) => {
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
                                <Blurb headerText={"Fastest"} dataText={input.fastestRoute.route}/>
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
                                <Blurb headerText={"Best Efficiency"} dataText={input.bestEfficiency.route}/>
                                </Grid>
                            </Box>
                        </Button>

                    </Grid>
                </Grid>
                <Grid item sm>
                    <DirectionBar currentDirection={directionIndex} directionList={ecoRoute ? input.bestEfficiency.directions : input.fastestRoute.directions}
                                  onForward={directionForward} onBackward={directionBackward}/>
                    <BasicMap currentDirection={directionIndex}
                              polySet={ecoRoute ? input.bestEfficiency.latLon : input.fastestRoute.latLon}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default RouteSelector;
