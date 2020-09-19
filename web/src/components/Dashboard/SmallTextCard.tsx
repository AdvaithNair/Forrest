import {COLORS, ReducerContext} from '@app/common';
import {Avatar, Box, Card, CardActions, CardContent, Grid, Hidden, Link, Typography} from '@material-ui/core';
import React, {useContext} from 'react';
import {UserContext} from "../../context/context";
import ShowChartIcon from '@material-ui/icons/ShowChart';
import LanguageIcon from '@material-ui/icons/Language';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LinearProgress from "@material-ui/core/LinearProgress";
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import SpeedIcon from '@material-ui/icons/Speed';

interface Props {
    text: string
    title: string;
    icon: any;
    iconBackground: string;
}



function LinearProgressWithLabel(props: any) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
        </Box>
    );
}

const SmallTextCard: React.FC<Props> = ({title, icon, iconBackground, text}) => {
    const {state, dispatch} = useContext<ReducerContext>(UserContext);

    let iconType;
    if (icon == 'nature') {
        iconType = <NaturePeopleIcon/>
    } else if (icon == 'cloud') {
        iconType = <FilterDramaIcon/>
    } else if (icon == 'drive') {
        iconType = <DriveEtaIcon/>
    } else if (icon == 'speed') {
        iconType = <SpeedIcon/>
    }  else {
        iconType = <ShowChartIcon/>
    }

    // @ts-ignore
    return (
        <Box m={2} style={{'position':"relative", 'minWidth':'290px'}}>
            <Avatar style={{'position':"absolute", "left":-10,"top":-10,"backgroundColor":iconBackground}} variant="square">
                {iconType}
            </Avatar>
            <Card>
                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        {title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        {(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase())}
                    </Typography>
                    <LinearProgressWithLabel value={100} />
                </CardContent>
            </Card>
        </Box>
    );
};

export default SmallTextCard;
