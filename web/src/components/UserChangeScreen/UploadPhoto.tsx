import React, { useContext, useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Tooltip,
  IconButton
} from '@material-ui/core';
import axios from '../../utils/axios';
import { clearLoading, setLoading } from '../../context/loading';
import STATE from '../../context/state';
import { FILE_UPLOADS, ReducerContext } from '@app/common';
import { UserContext } from '../../context/context';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Dropzone from 'react-dropzone-uploader';

const UploadPhoto = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitPhoto = (files: any) => {
    if (files[0]) {
      const formData = new FormData();
      const upload_file = files[0].file;
      formData.append(FILE_UPLOADS.PROFILE_PICTURE, upload_file);
      axios
        .post('/api/user/upload-profile-picture', formData)
        .then((res: any) => {
          setLoading(dispatch);
          dispatch({
            type: STATE.SET_UPLOAD_IMAGE,
            payload: res.data.imageURL
          });
          clearLoading(dispatch);
          setOpen(false);
        })
        .catch((error: any) => {
          console.log(error);
          console.log(error.message);
        });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Upload Profile Picture</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please upload a .jpeg/.png to display to other users. NOTE: This
            must follow the user guidelines
          </DialogContentText>
          <Box>
            <Dropzone
              onSubmit={submitPhoto}
              accept='image/*'
              maxFiles={1}
              inputContent={(_files: any, extra: any) =>
                extra.reject ? 'Image Files Only' : 'Choose File or Drop Here'
              }
              styles={{
                dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                inputLabel: (_files: any, extra: any) =>
                  extra.reject ? { color: 'red' } : {}
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Tooltip title='Update Profile Picture' placement='bottom'>
          <div className='profile-card-image-container' onClick={handleOpen}>
            <img
              className='profile-card-image'
              src={`${state.user.imageURL}?v=${Date.now()}`}
              key={Date.now()}
              alt={state.user.username}
            ></img>
            <div className='profile-card-image-overlay'>
              <IconButton
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <PhotoCameraIcon fontSize='large' />
              </IconButton>
            </div>
          </div>
        </Tooltip>
      </Grid>
    </div>
  );
};

export default UploadPhoto;
