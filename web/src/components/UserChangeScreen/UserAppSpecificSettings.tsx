import Box from '@material-ui/core/Box';
import React, {useContext, useState} from 'react';
import {Button, Grid, InputLabel, MenuItem, Select, Slider, Typography} from '@material-ui/core';
import {ReducerContext} from '@app/common';
import {UserContext} from '../../context/context';
import axios from '../../utils/axios';
import {clearLoading, setLoading} from '../../context/loading';
import STATE from '../../context/state';
import CustomSnackbar from '../General/Utility/Snackbar';

interface UserInfo {
    carType: any;
    highwayOver: number;
    cityOver: number;
}

const UserAppSpecificSettings = () => {
    const {state} = useContext<ReducerContext>(UserContext);
    const {dispatch} = useContext<ReducerContext>(UserContext);

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
                <Box marginBottom={1}>
                    <InputLabel id="carSelectLabel">Car Type:</InputLabel>
                    <Select
                        labelId="carSelectLabel"
                        id="carSelect"
                        value={input.carType}
                        onChange={e => setInput({...input, carType: e.target.value})}
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
                <Grid container
                      direction='row'
                      justify='space-evenly'
                      alignItems='center'>
                    <Grid item md={4}>
                        <Box p={2}>
                        <Typography id="continuous-slider">
                            Speed Over Limit on Highway
                        </Typography>
                        <Slider
                            defaultValue={0}
                            aria-labelledby="continuous-slider"
                            step={1}
                            marks
                            min={0}
                            max={15}
                            valueLabelDisplay="auto"
                        />
                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <Box p={2}>
                        <Typography id="continuous-slider">
                            Speed Over Limit in City
                        </Typography>
                        <Slider
                            defaultValue={0}
                            aria-labelledby="continuous-slider"
                            step={1}
                            marks
                            min={0}
                            max={15}
                            valueLabelDisplay="auto"
                        />
                        </Box>
                </Grid>
                </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary'>
                Update Driving Information
            </Button>
            <CustomSnackbar openStr={open}> </CustomSnackbar>
        </form>
    );
};

export default UserAppSpecificSettings;
