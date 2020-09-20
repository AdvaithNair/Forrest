import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import SignInBox from './SignInBox';

const SignInContainer = () => {

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      style={{ minHeight: '100vh' }}
    >
      <SignInBox />
    </Grid>
  );
};

export default SignInContainer;
