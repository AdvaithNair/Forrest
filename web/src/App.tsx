import { ReducerContext } from '@app/common';
import { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Animation from './components/General/Utility/Animation';
import Loading from './components/Loading/Loading';
import { UserContext } from './context/context';
import STATE from './context/state';
import Index from './pages/Index';
import ResourcesPage from './pages/ResourcesPage';
import SettingsPage from './pages/SettingsPage';
import axios from './utils/axios';
import DashboardPage from './pages/DashboardPage';
import RoutesPage from './pages/RoutesPage';
import Landing from './components/Landing/Landing';
import AuthRoute from './components/General/Utility/AuthRoute';
import NotFound from './components/General/Utility/NotFound';
import UserPage from './pages/UserPage';

const App: React.FC = () => {
  const [animation, setAnimation] = useState<boolean>(true);
  const { state, dispatch } = useContext<ReducerContext>(UserContext);
  const history = useHistory();

  const autoSignin = () => {
    console.log('hit');
    // Sends API Request to Verify User
    axios
      .get('/api/user/')
      .then((res: AxiosResponse) => {
        // Sets State
        dispatch({ type: STATE.SET_USER, payload: res.data });
        history.push('/');
      })
      .catch(() => {
        // Logout Code
        dispatch({ type: STATE.CLEAR_USER });
      });
  };

  // Persists User
  useEffect(() => {
    // Scroll to Top
    window.scrollTo(0, 0);

    // Sends API Request to Verify User
    axios
      .get('/api/user/')
      .then((res: AxiosResponse) => {
        // Sets State
        console.log(res.data)
        dispatch({ type: STATE.SET_USER, payload: res.data });
        // history.push('/');
      })
      .catch(() => {
        // Logout Code
        dispatch({ type: STATE.CLEAR_USER });
      });

    setTimeout(() => setAnimation(false), 1950);
    return () => {
      setAnimation(false);
    };
  }, []);

  return (
    <div className='App'>
      {animation && window.scrollTo(0, 0)}
      {animation && (
        <Animation style={{ display: animation ? 'flex' : 'none' }} />
      )}
      {state.loading && <Loading />}
      <Switch>
        <Route path='/' component={Index} exact />
        <Route path='/enter' component={Landing} exact />
        <AuthRoute path='/settings' component={SettingsPage} exact />
        <AuthRoute path='/resources' component={ResourcesPage} exact />
        <AuthRoute path='/dashboard' component={DashboardPage} exact />
        <AuthRoute path='/routes' component={RoutesPage} exact />
        <Route path='/users/:username' component={UserPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
