import React, { useContext } from 'react';
import { CARBON_SAVINGS, COLORS, ReducerContext } from '@app/common';
import { UserContext } from '../../../context/context';
import { Grid } from '@material-ui/core';
import SmallDataCard from '../SmallDataCard';
import SmallTextCard from '../SmallTextCard';

const CO2Statistics = () => {
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  return (
    <Grid container direction='row' justify='space-evenly' alignItems='center'>
      <Grid item sm>
        <SmallDataCard
          data={
            (state.user.carbonSaved -
              (state.user.carbonSaved % CARBON_SAVINGS.CARBON_PER_TREE)) /
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
          data={state.user.carbonSaved}
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
