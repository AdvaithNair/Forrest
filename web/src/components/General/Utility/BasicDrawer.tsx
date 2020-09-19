import { ReducerContext } from '@app/common';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MapIcon from '@material-ui/icons/Map';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import React, { useContext } from 'react';
import { UserContext } from '../../../context/context';
import { clearLoading, setLoading } from '../../../context/loading';
import STATE from '../../../context/state';
import { useHistory } from 'react-router';

interface Props {
  open: boolean;
  onClick: () => void;
}

const BasicDrawer: React.FC<Props> = ({ open, onClick }) => {
  const history = useHistory();

  const toPage = (destination: string) => {
    onClick();
    history.push(destination);
  };

  return (
    <div>
      <Drawer
        variant='temporary'
        onBackdropClick={onClick}
        onEscapeKeyDown={onClick}
        anchor='left'
        open={open}
      >
        <div>
          <IconButton onClick={onClick}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <ListItem button onClick={() => toPage('/dashboard')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItem>
          <ListItem button onClick={() => toPage('/routes')}>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary={'Routes'} />
          </ListItem>
          <ListItem button onClick={() => toPage('/resources')}>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary={'Resources'} />
          </ListItem>
          <ListItem button onClick={() => toPage('/settings')}>
            <ListItemIcon>
              <SettingsApplicationsIcon />
            </ListItemIcon>
            <ListItemText primary={'User Settings'} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default BasicDrawer;
