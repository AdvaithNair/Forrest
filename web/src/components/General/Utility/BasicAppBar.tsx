import { ReducerContext } from '@app/common';
import { Box, Button, Grid, IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { AxiosError } from 'axios';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../../context/context';
import { clearLoading, setLoading } from '../../../context/loading';
import STATE from '../../../context/state';
import axios from '../../../utils/axios';
import HeaderLogo from '../../../images/Branding/HeaderLogo.png';
import MenuIcon from '@material-ui/icons/Menu';
import BasicDrawer from './BasicDrawer';
import { useHistory } from 'react-router-dom';
import SearchComponent from "./SearchComponent";

const BasicAppBar: React.FC = () => {
  const history = useHistory();
  const { state, dispatch } = useContext<ReducerContext>(UserContext);
  const [open, setOpen] = useState<boolean>(false);

  const openDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    axios
      .post('/api/user/signout')
      .then(() => {
        setLoading(dispatch);
        dispatch({
          type: STATE.CLEAR_USER
        });
        clearLoading(dispatch);
        history.push('/');
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  return (
    <div>
      <BasicDrawer open={open} onClick={openDrawer} />
      <AppBar style={{ backgroundColor: 'black' }} position='static'>
        <Toolbar style={{ backgroundColor: 'black' }}>
          <Grid alignItems='center' justify='space-between' container>
            <Grid item>
              <Box marginTop={0.5}>
                <Grid alignItems='center' justify='space-between' container>
                  <IconButton onClick={openDrawer}>
                    <MenuIcon fontSize={'large'} style={{ color: 'white' }} />
                  </IconButton>
                  <img
                    src={HeaderLogo}
                    height={55}
                    className={'hover'}
                    style={{ marginLeft: 20 }}
                    onClick={() => history.push('/')}
                  />
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              <SearchComponent/>
            </Grid>
            <Grid item>
              <Button onClick={() => history.push('/settings')} color='inherit'>
                {`Welcome Back, ${state.user.firstName}`}
              </Button>
              <Button onClick={handleLogout} color='inherit'>
                Sign Out
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default BasicAppBar;
