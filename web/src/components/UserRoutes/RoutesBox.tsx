import {CARBON_SAVINGS, COLORS, ReducerContext} from '@app/common';
import {Divider, Grid, Stepper, Step, StepLabel, Typography, Button} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, {useContext, useState} from 'react';
import {UserContext} from '../../context/context';
import LanguageIcon from '@material-ui/icons/Language';
import RouteSelectionForm from "./RouteSelectionForm";

interface RouteInfo {
    start: string;
    end: string;
}

function getSteps() {
    return ['Select Start and End Locations', 'Choose Route', 'Confirm Arrival'];
}

function getStepContent(stepIndex: number) {
    switch (stepIndex) {
        case 0:
            return
        case 1:
            return 'C';
        case 2:
            return <LanguageIcon/>;
        default:

    }
}

const UserRoutesBox = () => {
    const {state, dispatch} = useContext<ReducerContext>(UserContext);

    const [input, setInput] = useState<RouteInfo>({
        start: "",
        end: ""
    });

    const [activeStep, setActiveStep] = React.useState<number>(0);
    const steps = getSteps();

    let stepContent;
    if (activeStep == 0) {
        stepContent = <RouteSelectionForm onEditStart={(e: { target: { value: any; }; }) => setInput({ ...input, start: e.target.value })} onEditEnd={(e: { target: { value: any; }; }) => setInput({ ...input, end: e.target.value })}/>;
    } else {
        stepContent = 'Unknown stepIndex';
    }

    console.log(input);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box boxShadow={4} bgcolor='background.paper' m={2} p={3} borderRadius={8}>
            <div >
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
                            <Typography >All steps completed</Typography>
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
        </Box>
    );
};

export default UserRoutesBox;
