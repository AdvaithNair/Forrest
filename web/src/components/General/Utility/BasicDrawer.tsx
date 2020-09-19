import {ReducerContext} from '@app/common';
import {IconButton, ListItem, ListItemIcon, Drawer, Divider, ListItemText, List} from '@material-ui/core';
import {AxiosError} from 'axios';
import React, {useContext} from 'react';
import {UserContext} from '../../../context/context';
import {clearLoading, setLoading} from '../../../context/loading';
import STATE from '../../../context/state';
import axios from '../../../utils/axios';
import theme from "../../../utils/theme";

interface Props {
    open: boolean;
}

const BasicAppBar: React.FC<Props> = ({ open }) => {
    const { dispatch } = useContext<ReducerContext>(UserContext);


    return (
        <div>
            <Drawer
                variant="persistent"
                anchor="left"
                open={true}
            >
                <List>
                        <ListItem button key={'item'}>
                            <ListItemText primary={'item'} />
                        </ListItem>
                </List>
                <Divider />
            </Drawer>
        </div>
    );
};

export default BasicAppBar;
