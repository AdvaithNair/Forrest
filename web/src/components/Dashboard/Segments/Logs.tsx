import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { ReducerContext, RouteLog } from '@app/common';
import { UserContext } from '../../../context/context';
import dayjs from 'dayjs';
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
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead style={{ backgroundColor: '#202020', color: 'white' }}>
            <TableRow>
              <TableCell style={{ color: 'white' }}>Route</TableCell>
              <TableCell align='right' style={{ color: 'white' }}>
                CO2 Saved (lbs)
              </TableCell>
              <TableCell align='right' style={{ color: 'white' }}>
                Fuel/Energy Saved (gal/kWh)
              </TableCell>
              <TableCell align='right' style={{ color: 'white' }}>
                Duration (min)
              </TableCell>
              <TableCell align='right' style={{ color: 'white' }}>
                Date
              </TableCell>
              <TableCell align='right' style={{ color: 'white' }}>
                Vehicle
              </TableCell>
              <TableCell align='right' style={{ color: 'white' }}>
                Verified
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.user.routeLogs.map(row => (
              <TableRow key={row.route}>
                <TableCell component='th' scope='row'>
                  {row.route}
                </TableCell>
                <TableCell align='right'>{`${row.carbonSaved} lbs`}</TableCell>
                <TableCell align='right'>
                  {row.carType === 'ELECTRIC'
                    ? `${((row.carbonSaved / 52) * 60).toFixed(2)} kWh`
                    : `${(row.carbonSaved / 20).toFixed(2)} gal`}
                </TableCell>
                <TableCell align='right'>{`${row.estimatedDuration} min`}</TableCell>
                <TableCell align='right'>
                  {dayjs(row.date).format('MMM D, YYYY')}
                </TableCell>
                <TableCell align='right'>
                  {row.carType.charAt(0).toUpperCase() +
                    row.carType.toLowerCase().slice(1)}
                </TableCell>
                <TableCell align='right'>{row.verified ? 'Y' : 'N'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {state.user.routeLogs.length === 0 && (
        <Typography style={{ marginTop: 10, color: 'red' }}>
          No Routes Available
        </Typography>
      )}
      {/* <Grid container>
        {state.user.routeLogs.map((element: RouteLog, index: number) => (
          <LogElement logData={element} key={index} />
        ))}
      </Grid> */}
    </Box>
  );
};

export default Logs;
