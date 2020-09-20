import { ReducerContext, UserCredentials } from '@app/common';
import { Divider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useContext } from 'react';
import { UserContext } from '../../context/context';
import CO2Statistics from './Segments/CO2Statistics';
import DrivingConstants from './Segments/DrivingConstants';
import UserComponent from './Segments/UserComponent';

interface Props {
  user: UserCredentials;
}
const MainUserComponent: React.FC<Props> = ({ user }) => {
  return (
    <Box boxShadow={4} bgcolor='background.paper' m={5} p={3} borderRadius={8}>
      <UserComponent user={user} />
      <Box m={2}>
        <Divider />
      </Box>
      <CO2Statistics user={user} />
      <Box m={2}>
        <Divider />
      </Box>
      <DrivingConstants user={user} />
    </Box>
  );
};

export default MainUserComponent;
