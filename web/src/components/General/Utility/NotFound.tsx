import React from 'react';
import { Typography, Button } from '@material-ui/core';
import Top from '../../../images/Branding/Top.png';
import { useHistory } from 'react-router-dom';

const NotFound: React.FC = () => {
  const history = useHistory();
  return (
    <div className='landing-background'>
      <div>
        <img
          src={Top}
          alt={'ForrestIconTop'}
          style={{ width: 150, marginBottom: -30 }}
        />
        <Typography style={{ fontSize: 100, fontWeight: 600, color: 'white' }}>
          LOST IN THE FOR<span style={{ color: '#7E8D2B' }}>REST</span>?
        </Typography>
        <Typography style={{ fontSize: 30, fontWeight: 600, color: 'white' }}>
          WE GET IT. IT CAN BE CONFUSING.
        </Typography>
        <Button
          style={{
            zIndex: 30,
            color: 'white',
            backgroundColor: '#005B13',
            margin: '0px auto',
            marginTop: 40,
            padding: '5px 30px',
            fontSize: 20
          }}
          onClick={() => history.push('/')}
        >
          Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
