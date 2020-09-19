import { ReducerContext } from '@app/common';
import React, { useContext } from 'react';
import Home from '../components/Home/Home';
import Landing from '../components/Landing/Landing';
import { UserContext } from '../context/context';

const Index: React.FC = () => {
  const { state } = useContext<ReducerContext>(UserContext);

  return (
    <div>
      {state.authenticated ? <Home /> : <Landing />}
    </div>
  );
};

export default Index;
