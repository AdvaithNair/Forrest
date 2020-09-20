import React, {useContext} from 'react';
import {Box, Button, Divider, Grid, Link, MobileStepper, Paper, Typography} from '@material-ui/core';
import {ReducerContext} from '@app/common';
import {UserContext} from '../../context/context';
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import CustomLink from "../General/Utility/CustomLink";

const tutorialSteps = [
    {
        intro: "Over the past 170 years...",
        fact: "Industry and human activities have increased atmospheric concentrations of CO2 by 47% since 1850",
        source: "https://climate.nasa.gov/vital-signs/carbon-dioxide/"
    },
    {
      intro: "It has been...",
      fact: "over 3 million years since the atmospheric CO2 amounts were this high",
      source: "https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide"
    },
    {
      intro: "The annual rate of increase over the past 60 years... ",
      fact: "is about 100 times faster than previous natural increases",
      source: "https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide"
    },
    {
      intro: "Without greenhouse gasses... ",
      fact: "Earth’s average annual temperature would be below freezing instead of close to 60°F",
      source: "https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide"
    },
    {
      intro: "CO2 can dissolve into the oceans... ",
      fact: "Which produces carbonic acid and lowers the PH of the ocean",
      source: "https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide"
    },
];

const CO2FactCard = () => {
    const {dispatch} = useContext<ReducerContext>(UserContext);
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        if (activeStep >= maxSteps - 1) {
            setActiveStep(0);
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        if (activeStep <= 0) {
            setActiveStep(maxSteps - 1);
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
        >
        <Box m={2} boxShadow={2} width={300}>
          <Box p={1} height={35}>
            <Paper square elevation={0}>
              <Typography variant='body2' color='textSecondary'>CO2 Fun Facts</Typography>
            </Paper>
            <Divider />
          </Box>
          <Box p={1} height={90}>
            <Paper square elevation={0}>
                <Typography variant='h6'>{tutorialSteps[activeStep].intro}</Typography>
            </Paper>
          </Box>
          <Box p={1} height={125}>
            <Paper square elevation={0}>
              <Typography variant='body1' color='textSecondary'>{tutorialSteps[activeStep].fact}</Typography>
            </Paper>
          </Box>
          <Box marginBottom={3} height={75}>
            <Paper square elevation={0}>
                <Link target="_blank" rel="noreferrer" href={tutorialSteps[activeStep].source}>
                    {tutorialSteps[activeStep].source}
                </Link>
            </Paper>
          </Box>
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="dots"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext}>
                        Next
                        <KeyboardArrowRight/>
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack}>
                        <KeyboardArrowLeft/>
                        Back
                    </Button>
                }
            />
        </Box>
        </Grid>
    );
};

export default CO2FactCard;
