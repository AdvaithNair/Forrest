import {ReducerContext} from '@app/common';
import {Box, Card, CardActions, CardContent, Grid, Hidden, Link, Typography} from '@material-ui/core';
import React, {useContext} from 'react';
import {UserContext} from "../../context/context";
import ShowChartIcon from '@material-ui/icons/ShowChart';
import LanguageIcon from '@material-ui/icons/Language';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';


interface Props {
    title: string;
    description: string;
    link: string;
    type: string;
}

const InfoCard: React.FC<Props> = ({title, description, link, type}) => {
    const {state, dispatch} = useContext<ReducerContext>(UserContext);

    let iconType;
    if (type == 'graph') {
        iconType = <ShowChartIcon/>
    } else if (type == 'article') {
        iconType = <ImportContactsIcon/>
    } else {
        iconType = <LanguageIcon/>
    }

    return (
        <div>
            <Hidden smDown>
                <Box width={420} m={1}>
                    <Card variant="outlined">
                        <CardContent>
                            <Grid container
                                  direction='column'
                                  justify='space-around'
                                  alignItems='center'>
                                <Box paddingBottom={1}>
                                    {iconType}
                                </Box>
                                <Typography color="textSecondary" gutterBottom>
                                    {title}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {description}
                                </Typography>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container
                                  direction='row'
                                  justify='center'
                                  alignItems='center'>
                                <Link href={link} target={'_blank'} rel="noreferrer" variant="body2">
                                    View Resource
                                </Link>
                            </Grid>
                        </CardActions>
                    </Card>
                </Box>
            </Hidden>
            <Hidden mdUp>
                <Box width={240} m={1}>
                    <Card variant="outlined">
                        <CardContent>
                            <Grid container
                                  direction='column'
                                  justify='space-around'
                                  alignItems='center'>
                                <Box paddingBottom={1}>
                                    {iconType}
                                </Box>
                                <Typography color="textSecondary" gutterBottom>
                                    {title}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {description}
                                </Typography>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container
                                  direction='row'
                                  justify='center'
                                  alignItems='center'>
                                <Link href={link} target={'_blank'} rel="noreferrer" variant="body2">
                                    View Resource
                                </Link>
                            </Grid>
                        </CardActions>
                    </Card>
                </Box>
            </Hidden>
        </div>
    );
};

export default InfoCard;
