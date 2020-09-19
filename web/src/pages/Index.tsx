import { ReducerContext } from '@app/common';
import React, { useContext } from 'react';
import Home from '../components/Home/Home';
import Landing from '../components/Landing/Landing';
import { UserContext } from '../context/context';
import HomePage from '../components/WebsiteHomePage/HomePage';

const Index: React.FC = () => {
  const { state } = useContext<ReducerContext>(UserContext);

  return (
    <div>
      {state.authenticated ? <Home /> : <HomePage />}
    </div>
  );
};

export default Index;
