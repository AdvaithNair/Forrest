import React, {useEffect, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import {useHistory} from "react-router-dom";
import axios from "../../../utils/axios";

const SearchComponent = () => {

    const history = useHistory();

    const [username, setUsername] = useState<string>('');
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [results, setResults] = useState<Array<any>>([]);

    useEffect(() => {
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
        }, [username]
    )

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
            <Dialog open={menuOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Friend Search!</DialogTitle>
                <DialogContent>
                    <Box width={300}>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <TextField
                                label={''}
                                type={'text'}
                                onChange={(e: { target: { value: any; }; }) => {
                                    setUsername(e.target.value)
                                }}
                                error={false}
                                helperText={'User Search'}
                                variant='outlined'
                                margin='normal'
                                fullWidth={false}
                                required={false}
                                style={{'backgroundColor': 'white', 'borderRadius': 8}}
                            />
                            <Grid item>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    {results.map((data: any) =>
                                        <Button onClick={() => history.push(`/users/${data.username}`)} color="primary">{data.username} - {data.carbonSaved} lbs of carbon saved</Button>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Button onClick={handleOpen} color="primary">
                Friend Search
            </Button>
        </div>
    );
}

export default SearchComponent;