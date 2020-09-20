import Box from '@material-ui/core/Box';
import React, {useContext, useState} from 'react';
import {Button, Grid, InputLabel, MenuItem, Select, Slider, Typography} from '@material-ui/core';
import {CAR_TYPES, ReducerContext} from '@app/common';
import {UserContext} from '../../context/context';
import axios from '../../utils/axios';
import {clearLoading, setLoading} from '../../context/loading';
import STATE from '../../context/state';
import CustomSnackbar from '../General/Utility/Snackbar';

interface UserInfo {
    carType: any;
    avgHighwayOver: any;
    avgCityOver: any;
}

const UserAppSpecificSettings = () => {
    const {state} = useContext<ReducerContext>(UserContext);
    const {dispatch} = useContext<ReducerContext>(UserContext);

    const [input, setInput] = useState<UserInfo>({
        carType: state.user.carType,
        avgHighwayOver: state.user.avgHighwayOver,
        avgCityOver: state.user.avgCityOver
    });

    const [open, setOpen] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios
            .put('/api/user/update/drive', {'parameters': input})
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
                        <MenuItem value={CAR_TYPES.SEDAN}>Sedan</MenuItem>
                        <MenuItem value={CAR_TYPES.HYBRID_SEDAN}>Hybrid</MenuItem>
                        <MenuItem value={CAR_TYPES.TRUCK}>Truck</MenuItem>
                        <MenuItem value={CAR_TYPES.VAN}>Van</MenuItem>
                        <MenuItem value={CAR_TYPES.SUV}>SUV</MenuItem>
                        <MenuItem value={CAR_TYPES.MOTORCYCLE}>Motorcycle</MenuItem>
                        <MenuItem value={CAR_TYPES.ELECTRIC}>Electric Vehicle</MenuItem>
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
                            defaultValue={input.avgHighwayOver}
                            aria-labelledby="continuous-slider"
                            step={1}
                            marks
                            min={0}
                            max={15}
                            valueLabelDisplay="auto"
                            onChange={(e, val) => setInput({...input, avgHighwayOver: val})}
                        />
                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <Box p={2}>
                        <Typography id="continuous-slider">
                            Speed Over Limit in City
                        </Typography>
                        <Slider
                            defaultValue={input.avgCityOver}
                            aria-labelledby="continuous-slider"
                            step={1}
                            marks
                            min={0}
                            max={15}
                            valueLabelDisplay="auto"
                            onChange={(e, val) => setInput({...input, avgCityOver: val})}
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
