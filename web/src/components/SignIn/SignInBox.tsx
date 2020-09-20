import Box from '@material-ui/core/Box';
import React from 'react';
import SignInForm from './SignInForm';
import { Grid, Button } from '@material-ui/core';
import Blurb from '../General/Misc/Blurb';
import Logo from '../../images/Branding/Logo.png';
import { useHistory } from 'react-router';

const SignInBox = () => {
  const history = useHistory();

  return (
    <Box boxShadow={4} bgcolor='background.paper' m={4} p={4} borderRadius={8}>
      <div className='auth-logo'>
        <img
          width='250'
          src={Logo}
          alt='Forrest'
          style={{ paddingBottom: '16px' }}
        />
      </div>
      <Grid
        container
        direction='row'
        justify='space-around'
        alignItems='flex-start'
      >
        <Grid item sm>
          <SignInForm />
        </Grid>
        <Grid item md>
          <Blurb
            headerText={'Welcome Back!'}
            dataText={'Please sign into your account'}
          />
          <Button
            onClick={() => history.push('/')}
            style={{
              color: 'white',
              backgroundColor: '#005B13',
              margin: '0 auto',
              padding: '5px 15px'
            }}
          >
            Back Home
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInBox;
