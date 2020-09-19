import { LOCALSTORAGE, ReducerContext } from '@app/common';
import {Box, Button, Grid, Typography} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { AxiosError } from 'axios';
import React, { useContext } from 'react';
import { UserContext } from '../../../context/context';
import { clearLoading, setLoading } from '../../../context/loading';
import STATE from '../../../context/state';
import axios from '../../../utils/axios';
import HeaderLogo from '../../../images/Branding/HeaderLogo.png'

interface Props {
  buttonText: string;
  route: string;
  title: string;
}

const BasicAppBar: React.FC<Props> = ({ title, buttonText, route }) => {
  const { dispatch } = useContext<ReducerContext>(UserContext);

  const handleSubmit = () => {
    axios
      .post('/api/user/signout')
      .then(() => {
        setLoading(dispatch);
        dispatch({
          type: STATE.CLEAR_USER
        });
        clearLoading(dispatch);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Grid
              alignItems='center'
              justify='space-between' container>
            <Grid item>
              <Box marginTop={.5}>
                <img src={HeaderLogo}  height={55}/>
              </Box>
            </Grid>
            <Grid item>
              <Button href={route} color='inherit'>
                {buttonText}
              </Button>
              <Button onClick={handleSubmit} color='inherit'>
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
