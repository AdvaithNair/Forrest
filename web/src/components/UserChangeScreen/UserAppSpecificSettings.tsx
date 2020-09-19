import Box from '@material-ui/core/Box';
import React, { useState, useContext } from 'react';
import {Button, Grid, InputLabel, MenuItem, Select, Snackbar, SnackbarContent} from '@material-ui/core';
import {
    EMAIL_REGEX,
    ERRORS,
    ReducerContext,
    CRYPTO_JS_SECRETS,
    LOCALSTORAGE
} from '@app/common';
import { UserContext } from '../../context/context';
import axios from '../../utils/axios';
import CryptoJS from 'crypto-js';
import TextEntryValued from '../General/Entry/FilledTextEntry';
import { clearLoading, setLoading } from '../../context/loading';
import STATE from '../../context/state';
import CustomSnackbar from '../General/Utility/Snackbar';

interface UserInfo {
    carType: any;
    highwayOver: number;
    cityOver: number;
}

const UserAppSpecificSettings = () => {
    const { state } = useContext<ReducerContext>(UserContext);
    const { dispatch } = useContext<ReducerContext>(UserContext);

    const [input, setInput] = useState<UserInfo>({
        carType: 'sedan',
        cityOver: 0,
        highwayOver: 0
    });

    const [open, setOpen] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios
            .put('/api/user/update', input)
            .then((res: any) => {
                // Set State Here
                setLoading(dispatch);
                dispatch({
                    type: STATE.SET_USER,
                    payload: res.data
                });
                clearLoading(dispatch);
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    return (
        <form noValidate onSubmit={handleSubmit}>
            <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
            >
                <Box m={4}>
                <InputLabel id="carSelectLabel">Car Type:</InputLabel>
                <Select
                    labelId="carSelectLabel"
                    id="carSelect"
                    value={input.carType}
                    onChange={e => setInput({ ...input, carType: e.target.value })}
                >
                    <MenuItem value={'sedan'}>Sedan</MenuItem>
                    <MenuItem value={'hybridSedan'}>Hybrid</MenuItem>
                    <MenuItem value={'truck'}>Truck</MenuItem>
                    <MenuItem value={'van'}>Van</MenuItem>
                    <MenuItem value={'SUV'}>SUV</MenuItem>
                    <MenuItem value={'motorcycle'}>Motorcycle</MenuItem>
                    <MenuItem value={'electric'}>Electric Vehicle</MenuItem>
                </Select>
                </Box>
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary'>
                Change Car Type
            </Button>
            <CustomSnackbar openStr={open}> </CustomSnackbar>
        </form>
    );
};

export default UserAppSpecificSettings;
