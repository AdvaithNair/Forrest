import { ReducerContext } from '@app/common';
import React, { useContext } from 'react';
import { UserContext } from '../../context/context';
import MainUserComponent from './MainUserComponent';
import Logs from './Segments/Logs';

const DashboardBox = () => {
  const { state } = useContext<ReducerContext>(UserContext);

  return (
    <div>
      <MainUserComponent user={state.user} />
      <Logs />
    </div>
  );
};

export default DashboardBox;
