import React, { useRef } from 'react';
import Logo from '../../images/Branding/Logo.png';
import {
  Button,
  IconButton,
  Grid,
  Card,
  Box,
  CardContent,
  Typography
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import DirectionsIcon from '@material-ui/icons/Directions';
import InfoIcon from '@material-ui/icons/Info';
import { useHistory } from 'react-router-dom';

const iconStyle = {
  fontSize: 50,
  color: 'green'
};

interface Props {
  title: string;
  body: string;
}
const CardComponent: React.FC<Props> = ({ title, body, children }) => {
  return (
    <Box m={2} style={{ position: 'relative', minWidth: '290px' }}>
      <Card style={{ height: 380, background: '#DDDDDD', padding: 20 }}>
        {children}
        <CardContent>
          <Typography color='textPrimary' gutterBottom style={{ fontSize: 25 }}>
            {title.toUpperCase()}
          </Typography>
          <Typography color='textSecondary' gutterBottom>
            {body}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

const HomePage: React.FC = () => {
  const cards = useRef(null);
  const history = useHistory();

  const toAuth = () => {
    //dispatch({ type: STATE.VIEW_WEB_APP });
    history.push('/enter');
  };

  return (
    <div className='landing-main'>
      <div className='landing-background' style={{ zIndex: 0, position: 'relative' }}>
        <div style={{ display: 'block' }}>
          <img className='landing-logo' src={Logo} alt={'Forrest'} />
          <div style={{ margin: '0 auto' }}>
            <Button
              style={{
                zIndex: 30,
                color: 'white',
                backgroundColor: '#005B13',
                margin: '0 auto',
                padding: '5px 30px',
                fontSize: 30
              }}
              onClick={toAuth}
            >
              Save The World
            </Button>
          </div>
          <div className='down-button'>
            <IconButton
              onClick={() =>
                window.scrollTo(0, (cards as any).current.offsetTop)
              }
            >
              <KeyboardArrowDownIcon style={{ fontSize: 40, color: 'white' }} />
            </IconButton>
          </div>
        </div>
      </div>
      <div className='card-section'>
        <Typography
          color='textPrimary'
          ref={cards}
          style={{ paddingTop: 80, fontSize: 50, fontWeight: 600 }}
        >
          DO YOUR PART
        </Typography>
        <Grid
          container
          direction='row'
          justify='space-around'
          alignItems='center'
        >
          <Grid item sm>
            <CardComponent
              title={'Problem'}
              body={
                "The world is dying. We see this all around us today, from the rising global temperatures to the raging forest fires in the West Coast. Climate Change, caused by our pollutions are slowly killing the Earth. If we don't stop soon, the world will be beyond saving. We need a solution. Now."
              }
            >
              <DriveEtaIcon style={iconStyle} />
            </CardComponent>
          </Grid>
          <Grid item sm>
            <CardComponent
              title={'Solution'}
              body={
                'Climate Change cannot be solved overnight. But we can do our part in making the environment a safer place. Enter Forrest, the app created to reduce our Carbon Dioxide (CO2) Emissions when driving by calculating energy and environmentally efficient routes. Forrest is the future.'
              }
            >
              <DirectionsIcon style={iconStyle} />
            </CardComponent>
          </Grid>
          <Grid item sm>
            <CardComponent
              title={'About'}
              body={
                'Forrest is a environmentally productive concept created by Advaith Nair and Dominic Hupp in response to the ongoing forest fires of the West Coast. We both recognize that Climate Change is a massive issue that must be solved one step at a time. Forrest is our solution.'
              }
            >
              <InfoIcon style={iconStyle} />
            </CardComponent>
          </Grid>
        </Grid>
        <Button
          style={{
            zIndex: 30,
            color: 'white',
            backgroundColor: '#005B13',
            margin: '40px auto',
            padding: '5px 30px',
            fontSize: 20
          }}
          onClick={toAuth}
        >
          Enter Forrest
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
