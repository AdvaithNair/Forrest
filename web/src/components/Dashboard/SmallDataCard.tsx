import {COLORS, ReducerContext} from '@app/common';
import {Avatar, Box, Card, CardActions, CardContent, Grid, Hidden, Link, Typography} from '@material-ui/core';
import React, {useContext} from 'react';
import {UserContext} from "../../context/context";
import ShowChartIcon from '@material-ui/icons/ShowChart';
import LanguageIcon from '@material-ui/icons/Language';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LinearProgress from "@material-ui/core/LinearProgress";


interface Props {
    data: number;
    max: number;
    title: string;
    icon: any;
    iconBackground: string;
    unit: string;
    barUnit: string;
}



function LinearProgressWithLabel(props: any) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )} ${props.barUnit}`}</Typography>
            </Box>
        </Box>
    );
}

const SmallDataCard: React.FC<Props> = ({data, max, unit, barUnit, title, icon, iconBackground}) => {
    const {state, dispatch} = useContext<ReducerContext>(UserContext);

    const normalise = ({value}: { value: number }) => (value - 0) * 100 / (max - 0);

    // @ts-ignore
    return (
        <div style={{'position':"relative"}}>
            <Avatar style={{'position':"absolute", "left":-5,"top":-5,"backgroundColor":COLORS.SECONDARY}} variant="square">
                <ShowChartIcon />
            </Avatar>
            <Card style={{'width':280}}>
                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        {title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        {data} / {max} {unit}
                    </Typography>
                    <LinearProgressWithLabel value={normalise({value: data})} barUnit={barUnit} />
                </CardContent>
            </Card>
        </div>
    );
};

export default SmallDataCard;
