import React, { useContext } from 'react';
import { COLORS, ReducerContext, UserCredentials } from '@app/common';
import { UserContext } from '../../../context/context';
import { Grid } from '@material-ui/core';
import SmallTextCard from '../SmallTextCard';

interface Props {
  user: UserCredentials;
}

const DrivingConstants: React.FC<Props> = ({ user }) => {
  return (
    <Grid container direction='row' justify='space-evenly' alignItems='center'>
      <Grid item sm>
        <SmallTextCard
          text={user.carType == 'hybridSedan' ? 'hybrid' : user.carType}
          title={'Current Vehicle'}
          icon={'car'}
          iconBackground={COLORS.SECONDARY}
        />
      </Grid>
      <Grid item sm>
        <SmallTextCard
          text={user.avgHighwayOver.toString()}
          title={'Avg. Speed Over Limit on Highway'}
          icon={'speed'}
          iconBackground={COLORS.PRIMARY}
        />
      </Grid>
      <Grid item sm>
        <SmallTextCard
          text={user.avgCityOver.toString()}
          title={'Avg. Speed Over Limit in City'}
          icon={'speed'}
          iconBackground={COLORS.PRIMARY}
        />
      </Grid>
    </Grid>
  );
};

export default DrivingConstants;
