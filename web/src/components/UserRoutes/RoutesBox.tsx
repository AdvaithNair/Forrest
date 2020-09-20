import {ReducerContext} from '@app/common';
import {Button, Step, StepLabel, Stepper, Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, {useContext, useState} from 'react';
import {UserContext} from '../../context/context';
import RouteSelectionForm from "./RouteSelectionForm";
import RouteCalculationForm from "./RouteCalculationSelectionForm";
import CustomSnackbar from "../General/Utility/Snackbar";
import axios from "../../utils/axios";
import ConfirmationCard from "./RouteConfirmationCard";
import {clearLoading, setLoading} from "../../context/loading";
import STATE from "../../context/state";
import { useHistory } from 'react-router-dom';

interface RouteInfo {
    start: string;
    end: string;
}

interface ChosenRoute {
    name: string;
    CO2Saved: string;
}

function getSteps() {
    return ['Select Start and End Locations', 'Choose Route', 'Confirm Arrival'];
}

const UserRoutesBox = () => {
    const {state, dispatch} = useContext<ReducerContext>(UserContext);
    const history = useHistory();

    const [input, setInput] = useState<RouteInfo>({
        start: "",
        end: ""
    });

    const [open, setOpen] = useState<string>('');

    const [readyToStart, setReadyToStart] = React.useState<boolean>(false);

    const [activeStep, setActiveStep] = React.useState<number>(0);
    const steps = getSteps();

    const doNothing = () => {
        console.log("Doing nothing")
    };

    let stepContent;
    if (activeStep == 0) {
        stepContent = <RouteSelectionForm
            onEditStart={(e: { target: { value: any; }; }) => setInput({...input, start: e.target.value})}
            onEditEnd={(e: { target: { value: any; }; }) => setInput({...input, end: e.target.value})}/>;
    } else if (activeStep == 1) {
        stepContent = <RouteCalculationForm start={input.start} end={input.end}/>
    } else if (activeStep == 2) {
        stepContent = <ConfirmationCard/>
    } else {
        stepContent = 'Unknown stepIndex';
    }

    const startRouteLog = () => {
        axios
            .post('/api/user/log/add', {
                route: state.currentRoute.route,
                carbonSaved: state.currentRoute.co2saved,
                estimatedDuration: state.currentRoute.duration
            })
            .then((res: any) => {

            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    const endRouteLog = () => {
        axios
            .put('/api/user/log/confirm', {
                route: state.currentRoute.route
            })
            .then((res: any) => {
                setLoading(dispatch);
                dispatch({
                    type: STATE.CLEAR_CURRENT_ROUTE
                });
                clearLoading(dispatch);
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    const handleNext = () => {
        if (activeStep == 0) {
            if (input.start === '' || input.start === undefined || input.end === '' || input.end === undefined) {
                return;
            }
        } else if (activeStep == 1) {
            console.log(state.currentRoute);
            if (!state.currentRoute.route) {
                setOpen("Make sure to click on the chosen route");
                return;
            } else {
                startRouteLog();
            }
        } else if (activeStep == 2) {
            endRouteLog();

            history.push('/');
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const startRoute = () => {
        setReadyToStart(true)
    };

    const handleReset = () => {
        setActiveStep(0);
        setReadyToStart(false);
        setInput({
            start: "", end: ""
        })
    };

    return (
        <Box boxShadow={4} bgcolor='background.paper' m={2} p={3} borderRadius={8}>
            <div>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography>All steps completed</Typography>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : activeStep === steps.length - 2 ? 'Begin' : 'Calculate'}
                                </Button>
                                <Button onClick={handleReset}>Reset</Button>
                            </div>
                            {stepContent}
                        </div>
                    )}
                </div>
            </div>
            <CustomSnackbar openStr={open}/>
        </Box>
    );
};

export default UserRoutesBox;
