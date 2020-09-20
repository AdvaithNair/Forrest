import React from 'react';
import { CARBON_SAVINGS, COLORS, UserCredentials } from '@app/common';
import { Grid } from '@material-ui/core';
import SmallDataCard from '../SmallDataCard';

interface Props {
  user: UserCredentials;
}

const CO2Statistics: React.FC<Props> = ({ user }) => {
  return (
    <Grid container direction='row' justify='space-evenly' alignItems='center'>
      <Grid item sm>
        <SmallDataCard
          data={
            (user.carbonSaved -
              (user.carbonSaved % CARBON_SAVINGS.CARBON_PER_TREE)) /
            CARBON_SAVINGS.CARBON_PER_TREE
          }
          max={100}
          title={'Trees Planted'}
          icon={'nature'}
          iconBackground={COLORS.SECONDARY}
          unit={'Trees'}
          barUnit={'Trees'}
        />
      </Grid>
      <Grid item sm>
        <SmallDataCard
          data={user.carbonSaved}
          max={CARBON_SAVINGS.CARBON_PER_TREE}
          title={'C02 Saved Until Next Tree'}
          icon={'cloud'}
          iconBackground={COLORS.PRIMARY}
          unit={'lbs'}
          barUnit={'%'}
        />
      </Grid>
    </Grid>
  );
};

export default CO2Statistics;
