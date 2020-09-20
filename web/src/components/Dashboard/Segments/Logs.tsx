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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Route</TableCell>
              <TableCell align='right'>CO2 Saved</TableCell>
              <TableCell align='right'>Energy Saved</TableCell>
              <TableCell align='right'>Duration</TableCell>
              <TableCell align='right'>Date</TableCell>
              <TableCell align='right'>Vehicle</TableCell>
              <TableCell align='right'>Verified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.user.routeLogs.map(row => (
              <TableRow key={row.route}>
                <TableCell component='th' scope='row'>
                  {row.route}
                </TableCell>
                <TableCell align='right'>{row.carbonSaved}</TableCell>
                <TableCell align='right'>
                  {row.carType === 'ELECTRIC'
                    ? (row.carbonSaved / 52).toFixed(2)
                    : (row.carbonSaved / 20).toFixed(2)}
                </TableCell>
                <TableCell align='right'>{`${row.estimatedDuration}m`}</TableCell>
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
    </Box>
  );
};

export default Logs;
