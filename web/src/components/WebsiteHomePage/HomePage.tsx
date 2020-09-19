import { ReducerContext } from '@app/common';
import { Grid, Button, Toolbar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useContext } from 'react';
import { UserContext } from '../../context/context';
import { clearLoading, setLoading } from '../../context/loading';
import STATE from '../../context/state';
import AppBar from '@material-ui/core/AppBar';
import HeaderLogo from '../../images/Branding/HeaderLogo.png';
import trafficSplash from '../../images/Display/trafficSplash.jpg';
import treeSplash from '../../images/Display/treeSplash.jpg';
import aboutSplash from '../../images/Display/aboutSplash.jpg';
import BasicHomepageCard from './BasicHomepageCard';

const HomePage = () => {
  const { dispatch } = useContext<ReducerContext>(UserContext);
  // const [open, setOpen] = React.useState(false);

  const doNothing = () => {
    //Do nothing
  };

  const startApp = () => {
    setLoading(dispatch);
    dispatch({
      type: STATE.VIEW_WEB_APP
    });
    clearLoading(dispatch);
  };

  return (
    <div style={{ display: "block",height: "auto", width: '100vw', overflowY: 'auto' }}>
      <AppBar position='static' style={{ backgroundColor: 'black' }}>
        <Toolbar style={{ backgroundColor: 'black' }}>
          <Grid alignItems='center' justify='space-between' container>
            <Grid item>
              <Box marginTop={0.5}>
                <Grid alignItems='center' justify='space-between' container>
                  <img src={HeaderLogo} height={55} />
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              <Button onClick={startApp} color='inherit'>
                Enter App
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        boxShadow={4}
        height={'100%'}
        bgcolor='background.paper'
        m={0}
        p={1}
        borderRadius={0}
      >
        <BasicHomepageCard
          desc1={
            'An innovative routing application that rewards both the user and the planet if the most efficent route is taken'
          }
          desc2={
            'Using the Google Maps API, live traffic data is processed in order to return a variety of route options to balance ' +
            'both duration and eco-efficiency, measured in lbs of CO2 saved'
          }
          title={'Forrest'}
          buttonText={'Sign up for Forrest'}
          buttonFunction={startApp}
          image={trafficSplash}
        />
        <Grid container alignItems='center' justify='space-between'>
          <Grid item md>
            <BasicHomepageCard
              desc1={
                'For every 500 lbs of CO2 prevented from entering the atmosphere...'
              }
              desc2={
                'Forrest will have one tree planted to help boost the environment and to celebrate your journey towards becoming carbon neutral'
              }
              title={'Green Initiative'}
              buttonText={' '}
              buttonFunction={doNothing}
              image={treeSplash}
            />
          </Grid>
          <Grid item md>
            <BasicHomepageCard
              desc1={
                'This project was created by Advaith Nair & Dominic Hupp for hackMIT 2020'
              }
              desc2={
                'Between them, they have one hackathon worth of experience and are excited to be a part of this competition!'
              }
              title={'About Us'}
              buttonText={' '}
              buttonFunction={doNothing}
              image={aboutSplash}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HomePage;
