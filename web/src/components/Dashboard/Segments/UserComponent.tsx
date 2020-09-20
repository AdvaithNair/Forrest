import React from 'react';
import {
  Grid,
  Box,
  Avatar,
  Card,
  CardContent,
  Typography,
  Tooltip
} from '@material-ui/core';
import NatureIcon from '@material-ui/icons/Nature';
import EcoIcon from '@material-ui/icons/Eco';
import DirectionsIcon from '@material-ui/icons/Directions';
import { UserCredentials } from '@app/common';
import Facebook from '../../../images/Socials/FacebookLogo.png';
import Instagram from '../../../images/Socials/InstagramLogo.png';
import Twitter from '../../../images/Socials/TwitterLogo.png';
import Snapchat from '../../../images/Socials/SnapchatLogo.png';

const bigIcon = 50;
const green = '#005B13';

interface MainProps {
  title: string;
  statistic: number;
  color: string;
  units: string;
}

const MainStats: React.FC<MainProps> = ({
  title,
  statistic,
  color,
  units,
  children
}) => {
  return (
    <Box
      m={2}
      style={{
        position: 'relative',
        minWidth: '290px'
      }}
    >
      <Card style={{ backgroundColor: '#DDDDDD' }}>
        <CardContent>
          <Avatar
            style={{
              backgroundColor: color,
              borderRadius: 5,
              width: bigIcon,
              height: bigIcon,
              display: 'flex',
              margin: '0 auto'
            }}
            variant='square'
          >
            {children}
          </Avatar>
          <Typography
            color='textPrimary'
            gutterBottom
            style={{
              fontSize: 25,
              fontWeight: 600,
              marginTop: 10,
              marginBottom: -15
            }}
          >
            {title.toUpperCase()}
          </Typography>
          <Typography
            color='textSecondary'
            gutterBottom
            style={{ fontSize: 50 }}
          >
            {statistic}
          </Typography>
        </CardContent>
        <Typography
          color='textSecondary'
          gutterBottom
          style={{ fontSize: 15, marginTop: -40 }}
        >
          {units.toUpperCase()}
        </Typography>
      </Card>
    </Box>
  );
};

const getImage = (provider: string): string => {
  if (provider === 'Facebook') {
    return Facebook;
  } else if (provider === 'Instagram') {
    return Instagram;
  } else if (provider === 'Twitter') {
    return Twitter;
  } else if (provider === 'Snapchat') {
    return Snapchat;
  } else {
    return '';
  }
};

interface Props {
  user: UserCredentials;
}
const UserComponent: React.FC<Props> = ({ user }) => {
  const toSocialMedia = (provider: string) => {
    let url = '';
    if (provider === 'Facebook') {
      url = user.facebook;
    } else if (provider === 'Instagram') {
      url = user.instagram;
    } else if (provider === 'Twitter') {
      url = user.twitter;
    } else if (provider === 'Snapchat') {
      url = user.snapchat;
    }
    window.open(url, '_blank');
  };

  return (
    <Grid container direction='row' justify='space-around' alignItems='center'>
      <Grid container alignItems='flex-end'>
        <Grid item xs>
          <Tooltip title={'Facebook'}>
            <img
              className='user-social hover'
              src={getImage('Facebook')}
              alt={'Facebook'}
              onClick={() => toSocialMedia('Facebook')}
            />
          </Tooltip>
        </Grid>
        <Grid item xs>
          <Tooltip title={'Instagram'}>
            <img
              className='user-social hover'
              src={getImage('Instagram')}
              alt={'Instagram'}
              onClick={() => toSocialMedia('Instagram')}
            />
          </Tooltip>
        </Grid>
        <Grid item xs={6}>
          <img
            className='social-main-image'
            src={`${user.imageURL}`}
            alt={user.username}
          ></img>
        </Grid>

        <Grid item xs>
          <Tooltip title={'Twitter'}>
            <img
              className='user-social hover'
              src={getImage('Twitter')}
              alt={'Twitter'}
              onClick={() => toSocialMedia('Twitter')}
            />
          </Tooltip>
        </Grid>
        <Grid item xs>
          <Tooltip title={'Snapchat'}>
            <img
              className='user-social hover'
              src={getImage('Snapchat')}
              alt={'Snapchat'}
              onClick={() => toSocialMedia('Snapchat')}
            />
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography
          color='textPrimary'
          style={{ fontSize: 30, marginTop: 10 }}
        >{`${user.firstName} ${user.lastName}`}</Typography>
        <Typography
          style={{ fontSize: 25, color: green }}
        >{`@${user.username}`}</Typography>
      </Grid>
      <Grid container>
        <Grid item sm>
          <MainStats
            title={'Trees Planted'}
            statistic={parseFloat((user.carbonSaved / 500).toFixed(2))}
            color={green}
            units={user.carbonSaved / 500 === 1 ? 'tree' : 'trees'}
          >
            <NatureIcon style={{ fontSize: bigIcon - 5 }} />
          </MainStats>
        </Grid>
        <Grid item sm>
          <MainStats
            title={'CO2 Saved'}
            statistic={parseFloat(user.carbonSaved.toFixed(2))}
            color={green}
            units={'lbs'}
          >
            <EcoIcon style={{ fontSize: bigIcon - 5 }} />
          </MainStats>
        </Grid>
        <Grid item sm>
          <MainStats
            title={'Routes Taken'}
            statistic={user.routesTaken}
            color={green}
            units={user.routesTaken === 1 ? 'route' : 'routes'}
          >
            <DirectionsIcon style={{ fontSize: bigIcon - 5 }} />
          </MainStats>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserComponent;
