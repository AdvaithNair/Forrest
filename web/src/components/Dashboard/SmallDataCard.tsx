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
import LanguageIcon from '@material-ui/icons/Language';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LinearProgress from '@material-ui/core/LinearProgress';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';

interface Props {
  data: number;
  max: number;
  title: string;
  icon: any;
  iconBackground: string;
  unit: string;
  barUnit: string;
}

function LinearProgressWithLabel(props: any) {
  return (
    <Box display='flex' alignItems='center' bottom>
      <Box width='90%' mr={1}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant='body2' color='textSecondary'>{`${Math.round(
          props.value
        )} ${props.barUnit}`}</Typography>
      </Box>
    </Box>
  );
}

const SmallDataCard: React.FC<Props> = ({
  data,
  max,
  unit,
  barUnit,
  title,
  icon
}) => {
  const mediumIcon = 40;

  const normalise = ({ value }: { value: number }) =>
    ((value - 0) * 100) / (max - 0);

  let iconType;
  if (icon == 'nature') {
    iconType = <NaturePeopleIcon />;
  } else if (icon == 'cloud') {
    iconType = <FilterDramaIcon />;
  } else {
    iconType = <ShowChartIcon />;
  }

  // @ts-ignore
  return (
    <Box m={2} style={{ position: 'relative', minWidth: '240px' }}>
      <Card style={{ backgroundColor: '#DDDDDD', height: 175 }}>
        <CardContent>
          <Avatar
            style={{
              backgroundColor: COLORS.PRIMARY,
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
            style={{ marginTop: 10, fontSize: 20 }}
          >
            {title}
          </Typography>
          <Typography color='textSecondary' gutterBottom>
            {parseFloat(data.toString()).toFixed(2)} /{' '}
            {parseFloat(max.toString()).toFixed(2)} {unit}
          </Typography>
          <LinearProgressWithLabel
            value={normalise({ value: data })}
            barUnit={barUnit}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default SmallDataCard;
