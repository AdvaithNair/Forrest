import React from 'react'
import {Box, Button, Hidden, MobileStepper, Paper, Typography} from "@material-ui/core";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";


interface Props {
    currentDirection: number;
    directionList: any;
    onForward: any;
    onBackward: any;
}


const DirectionBar: React.FC<Props> = ({directionList, currentDirection, onForward, onBackward}) => {
    var parse = require('html-react-parser');

    let dispString;
    if (directionList.length == 0) {
        dispString = "Rendering";
    } else {
        dispString = directionList[currentDirection]
    }

    let maxSteps;
    if (directionList.length == 0) {
        maxSteps = 1;
    } else {
        maxSteps = directionList.length
    }

    return (
        <div>
            <Paper square elevation={0}>
                <Hidden mdUp>
                <Box height={75}>
                    <Typography>{parse(dispString)}</Typography>
                </Box>
                </Hidden>
                <Hidden smDown>
                    <Box height={35}>
                        <Typography>{parse(dispString)}</Typography>
                    </Box>
                </Hidden>
            </Paper>
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={currentDirection}
                nextButton={
                    <Button size="small" onClick={onForward} disabled={currentDirection === maxSteps - 1}>
                        Next
                        <KeyboardArrowRight/>
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={onBackward} disabled={currentDirection === 0}>
                        <KeyboardArrowLeft/>
                        Back
                    </Button>
                }
            />
        </div>

    )
}

export default DirectionBar