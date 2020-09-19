import React, {useContext} from 'react';
import {Grid, Typography} from '@material-ui/core';
import SocialMediaBar from './SocialMediaBar';
import InstagramLogo from '../../images/Socials/InstagramLogo.png';
import TwitterLogo from '../../images/Socials/TwitterLogo.png';
import FacebookLogo from '../../images/Socials/FacebookLogo.png';
import SnapchatLogo from '../../images/Socials/SnapchatLogo.png';
import {COLORS, ReducerContext} from "@app/common";
import {UserContext} from "../../context/context";

const SocialMediaGrid = () => {
    const { state, dispatch } = useContext<ReducerContext>(UserContext);

  return (
    <div>
      <Typography variant='body2'>Connect with External Account</Typography>
      <Grid
        container
        direction='row'
        justify='space-around'
        alignItems='flex-start'
      >
        <SocialMediaBar
            backgroundColor={!state.user.instagram ? 'default' : COLORS.SECONDARY}
          logo={InstagramLogo}
          imgHeight={25}
          text={'Instagram'}
          width={180}
          height={55}
            defaultInput={state.user.instagram}
        />
        <SocialMediaBar
            backgroundColor={!state.user.twitter ? 'default' : COLORS.SECONDARY}
          logo={TwitterLogo}
          imgHeight={20}
          text={'Twitter'}
          width={180}
          height={55}
            defaultInput={state.user.twitter}
        />
        <SocialMediaBar
            backgroundColor={!state.user.facebook ? 'default' : COLORS.SECONDARY}
          logo={FacebookLogo}
          imgHeight={25}
          text={'Facebook'}
          width={180}
          height={55}
            defaultInput={state.user.facebook}
        />
        <SocialMediaBar
            backgroundColor={!state.user.snapchat ? 'default' : COLORS.SECONDARY}
          logo={SnapchatLogo}
          imgHeight={25}
          text={'Snapchat'}
          width={180}
          height={55}
            defaultInput={state.user.snapchat}
        />
      </Grid>
    </div>
  );
};

export default SocialMediaGrid;
