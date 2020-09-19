import React, {useContext} from "react";
import {CARBON_SAVINGS, COLORS, ReducerContext} from "@app/common";
import {UserContext} from "../../../context/context";
import {Grid} from "@material-ui/core";
import SmallDataCard from "../SmallDataCard";
import SmallTextCard from "../SmallTextCard";

const DrivingConstants = () => {
    const {state, dispatch} = useContext<ReducerContext>(UserContext);

    return (
        <Grid
            container
            direction='row'
            justify='space-evenly'
            alignItems='center'
        >
            <Grid item sm>
                <SmallTextCard text={state.user.carType == 'hybridSedan' ? 'hybrid' : state.user.carType} title={"Current Vehicle"} icon={'car'} iconBackground={COLORS.SECONDARY}/>
            </Grid>
            <Grid item sm>
                <SmallTextCard text={state.user.avgHighwayOver.toString()} title={"Avg. Speed Over Limit on Highway"} icon={'speed'} iconBackground={COLORS.PRIMARY}/>
            </Grid>
            <Grid item sm>
                <SmallTextCard text={state.user.avgCityOver.toString()} title={"Avg. Speed Over Limit in City"} icon={'speed'} iconBackground={COLORS.PRIMARY}/>
            </Grid>
        </Grid>
    );
};

export default DrivingConstants;