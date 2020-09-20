import React, { useContext } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@material-ui/core';
import { ReducerContext, RouteLog } from '@app/common';
import { UserContext } from '../../../context/context';

interface Props {
  logData: RouteLog;
}
const LogElement: React.FC<Props> = ({ logData }) => {
  return (
    <Grid xs={12}>
      <Box
        m={2}
        style={{
          position: 'relative',
          minWidth: '290px'
        }}
      >
        <Card style={{ backgroundColor: '#DDDDDD' }}>
          <CardContent>{logData.date}</CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

const Logs: React.FC = () => {
  const { state } = useContext<ReducerContext>(UserContext);

  return (
    <Box boxShadow={4} bgcolor='background.paper' m={5} p={3} borderRadius={8}>
      <Typography
        color='textPrimary'
        style={{ fontSize: 40, marginTop: 10, fontWeight: 600 }}
      >
        ROUTES
      </Typography>
        /*
      <Grid container>
        {state.user.routeLogs.map((element: RouteLog, index: number) => (
          <LogElement logData={element} key={index} />
        ))}
      </Grid>
      */
    </Box>
  );
};

export default Logs;
