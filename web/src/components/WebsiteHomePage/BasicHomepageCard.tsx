import React from "react";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import trafficSplash from "../../images/Display/trafficSplash.jpg";
import Box from "@material-ui/core/Box";

interface Props {
    desc1: string;
    desc2: string;
    title: string;
    buttonText: string;
    buttonFunction: any;
    image: any;
}

const BasicHomepageCard: React.FC<Props> = ({ title, desc1, desc2, buttonText, buttonFunction, image }) => {

  return (
      <Box m={1}>
          <Card >
              <CardActionArea>
                  <CardMedia
                      image={image}
                      style={{'height':'15vh'}}
                      title="Traffic"
                  />
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                          {title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          {desc1}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          {desc2}
                      </Typography>
                  </CardContent>
              </CardActionArea>
              <CardActions>
                  <Grid container
                        alignItems='center'
                        justify='center'>
                      <Button onClick={buttonFunction} size="small" color="primary">
                          {buttonText}
                      </Button>
                  </Grid>
              </CardActions>
          </Card>
      </Box>
  );
};

export default BasicHomepageCard;