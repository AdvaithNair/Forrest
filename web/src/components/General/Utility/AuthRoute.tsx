import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ReducerContext } from '@app/common';
import { UserContext } from '../../../context/context';

interface Props {
  component: any;
  exact: Boolean;
  path: string;
}

export const AuthRoute: React.FC<Props> = ({ exact, path, component }) => {
  // Importing Context (Global Store)
  const { state } = useContext<ReducerContext>(UserContext);

  return (
    <div>
      {state.authenticated === false ? (
        <Redirect to='/' />
      ) : (
        <Route {...exact} path={path} component={component} />
      )}
    </div>
  );
};

export default AuthRoute;
