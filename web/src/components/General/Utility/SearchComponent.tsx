import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField/TextField';
import { useHistory } from 'react-router-dom';
import axios from '../../../utils/axios';
import SearchIcon from '@material-ui/icons/Search';

const SearchComponent = () => {
  const history = useHistory();

  const [username, setUsername] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [results, setResults] = useState<Array<any>>([]);

  useEffect(() => {
    if (username !== '') {
      axios
        .get('/api/user/search', {
          params: {
            username: username
          }
        })
        .then((res: any) => {
          console.log(res.data);
          setResults(res.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      setResults([]);
    }
  }, [username]);

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleOpen = () => {
    setMenuOpen(true);
  };

  const doNothing = () => {
    console.log('Doing nothing');
  };

  return (
    <div>
      <Dialog
        open={menuOpen}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>User Search</DialogTitle>
        <DialogContent>
          <Box width={300}>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
            >
              <TextField
                label={''}
                type={'text'}
                onChange={(e: { target: { value: any } }) => {
                  setUsername(e.target.value);
                }}
                error={false}
                helperText={'Search For Friends'}
                variant='outlined'
                margin='normal'
                fullWidth={false}
                required={false}
                style={{ backgroundColor: 'white', borderRadius: 8 }}
              />
              <Grid item>
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                >
                  {results.map((data: any) => (
                    <Button
                      onClick={() => {
                        history.push(`/users/${data.username}`);
                        handleClose();
                      }}
                      color='primary'
                    >
                      {data.username} - {data.carbonSaved} lbs of carbon saved
                    </Button>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton
        onClick={handleOpen}
        style={{ backgroundColor: 'green', borderRadius: '50%' }}
        color='primary'
      >
        <SearchIcon style={{ color: 'white' }} />
      </IconButton>
    </div>
  );
};

export default SearchComponent;
