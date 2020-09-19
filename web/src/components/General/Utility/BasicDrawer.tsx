import {ReducerContext} from '@app/common';
import {IconButton, ListItem, ListItemIcon, Drawer, Divider, ListItemText, List} from '@material-ui/core';
import {AxiosError} from 'axios';
import React, {ChangeEvent, useContext} from 'react';
import {UserContext} from '../../../context/context';
import {clearLoading, setLoading} from '../../../context/loading';
import STATE from '../../../context/state';
import axios from '../../../utils/axios';
import theme from "../../../utils/theme";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MapIcon from '@material-ui/icons/Map';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

interface Props {
    open: boolean;
    onClick: (e: any) => void;
}

const BasicDrawer: React.FC<Props> = ({ open, onClick }) => {
    const { state,dispatch } = useContext<ReducerContext>(UserContext);

    const setPage = (key: string) => {
        setLoading(dispatch);
        dispatch({
            type: STATE.SET_VIEW_PAGE,
            payload: key
        });
        clearLoading(dispatch);
    }
    return (
        <div>
            <Drawer
                variant='temporary'
                onBackdropClick={onClick}
                onEscapeKeyDown={onClick}
                anchor="left"
                open={open}
            >
                <div>
                    <IconButton onClick={onClick}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <List>
                    <ListItem button onClick={() => setPage('dashboard')}>
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>
                    <ListItem button onClick={() => setPage('map')}>
                        <ListItemIcon><MapIcon /></ListItemIcon>
                        <ListItemText primary={'Routes'} />
                    </ListItem>
                    <ListItem button onClick={() => setPage('resources')}>
                        <ListItemIcon><MenuBookIcon /></ListItemIcon>
                        <ListItemText primary={'Resources'} />
                    </ListItem>
                    <ListItem button onClick={() => setPage('settings')}>
                        <ListItemIcon><SettingsApplicationsIcon /></ListItemIcon>
                        <ListItemText primary={'User Settings'} />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        </div>
    );
};

export default BasicDrawer;
