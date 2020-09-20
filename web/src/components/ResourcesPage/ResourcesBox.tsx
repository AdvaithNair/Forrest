import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';
import InfoCard from './InfoCard';

const ResourcesBox = () => {
  return (
    <Box boxShadow={4} bgcolor='background.paper' m={5} p={3} borderRadius={8}>
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='flex-start'
      >
        <Grid item>
          <InfoCard
            type={'article'}
            title={'EcoDrivers Manual'}
            description={
              'This resource from the US government has information on how to improve fuel ' +
              'economy in safe and effective ways'
            }
            link={
              'https://www.fs.fed.us/sustainableoperations/documents/TheEcoDriversManual.pdf'
            }
          />
        </Grid>
        <Grid item>
          <InfoCard
            type={''}
            title={'Techniques for Drivers to Conserve Fuel'}
            description={
              'This resource has more information and quick tips on' +
              ' methods for improving behavior to benefit driving & fuel economy'
            }
            link={'https://afdc.energy.gov/conserve/behavior_techniques.html'}
          />
        </Grid>
        <Grid item>
          <InfoCard
            type={'graph'}
            title={'Average Fuel Economy by Major Vehicle Category'}
            description={
              'This graph represents the different types of vehicles' +
              ' and their varying average MPG'
            }
            link={'https://afdc.energy.gov/data/10310'}
          />
        </Grid>
        <Grid item>
          <InfoCard
            type={''}
            title={'Gasoline to CO2'}
            description={
              'This NASA (kid friendly) resource talks about how to convert from the volume of' +
              ' gasoline consumed to the amount of CO2 produced'
            }
            link={'https://climatekids.nasa.gov/review/carbon/gasoline.html'}
          />
        </Grid>
        <Grid item>
          <InfoCard
            type={'article'}
            title={'Signal Cycle Lengths'}
            description={
              'This informative article talks about the science between traffic light timing' +
              ' for intersections with predetermined amounts of time configured'
            }
            link={
              'https://nacto.org/publication/urban-street-design-guide/intersection-design-elements/traffic-signals/signal-cycle-lengths/'
            }
          />
        </Grid>
        <Grid item>
          <InfoCard
            type={''}
            title={'Turn Off Your Idling Engines'}
            description={
              'This resource talks about the dangers of idling for long periods of time' +
              ' and helped provide data for the amount of gas consumed at intersections'
            }
            link={
              'https://www.edf.org/attention-drivers-turn-your-idling-engines'
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResourcesBox;
