import { Divider, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';
import SocialMediaGrid from './SocialMediaGrid';
import UploadPhoto from './UploadPhoto';
import UserAppSpecificSettings from './UserAppSpecificSettings';
import UserChangeInfoForm from './UserChangeInfoForm';
import UserPasswordUpdateForm from './UserPasswordUpdateForm';

const UserSettingsBox = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box boxShadow={4} bgcolor='background.paper' m={5} p={3} borderRadius={8}>
      <Grid
        container
        direction='row'
        justify='space-around'
        alignItems='center'
      >
        <Grid item sm={4}>
          <UploadPhoto />
        </Grid>
        <Grid item sm>
          <UserChangeInfoForm />
        </Grid>
      </Grid>
      <Box m={2}>
        <Divider />
      </Box>
      <Grid
        container
        direction='row'
        justify='space-around'
        alignItems='flex-start'
      >
        <Grid item sm={4}>
          <SocialMediaGrid />
        </Grid>
        <Grid item sm>
          <UserAppSpecificSettings />
        </Grid>
      </Grid>
      <Box m={2}>
        <Divider />
      </Box>
      <Grid
        container
        direction='row'
        justify='space-around'
        alignItems='center'
      >
        <Box width={'100%'}>
          <UserPasswordUpdateForm />
        </Box>
      </Grid>
    </Box>
  );
};

export default UserSettingsBox;
