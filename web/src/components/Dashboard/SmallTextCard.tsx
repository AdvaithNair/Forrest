import { COLORS, ReducerContext } from '@app/common';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Hidden,
  Link,
  Typography
} from '@material-ui/core';
import React, { useContext } from 'react';
import { UserContext } from '../../context/context';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import LinearProgress from '@material-ui/core/LinearProgress';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import SpeedIcon from '@material-ui/icons/Speed';
import LocationCityIcon from '@material-ui/icons/LocationCity';

interface Props {
  text: string;
  title: string;
  icon: any;
  iconBackground: string;
}

const SmallTextCard: React.FC<Props> = ({
  title,
  icon,
  iconBackground,
  text
}) => {
  const mediumIcon = 35;

  let iconType;
  if (icon == 'nature') {
    iconType = <NaturePeopleIcon />;
  } else if (icon == 'city') {
    iconType = <LocationCityIcon />;
  } else if (icon == 'drive') {
    iconType = <DriveEtaIcon />;
  } else if (icon == 'speed') {
    iconType = <SpeedIcon />;
  } else {
    iconType = <ShowChartIcon />;
  }

  // @ts-ignore
  return (
    <Box m={2} style={{ position: 'relative', minWidth: '290px' }}>
      <Card style={{ backgroundColor: '#DDDDDD' }}>
        <CardContent>
          <Avatar
            style={{
              backgroundColor: '#F7931E',
              borderRadius: 5,
              width: mediumIcon,
              height: mediumIcon,
              display: 'flex',
              margin: '0 auto'
            }}
            variant='square'
          >
            {iconType}
          </Avatar>
          <Typography
            color='textPrimary'
            gutterBottom
            style={{ marginTop: 15 }}
          >
            {title}
          </Typography>
          <Typography
            color='textSecondary'
            gutterBottom
            style={{ marginBottom: -10 }}
          >
            {text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SmallTextCard;
