import React, { useContext, useEffect } from 'react';
import BasicAppBar from '../General/Utility/BasicAppBar';
import { COLORS, ReducerContext } from '@app/common';
import { UserContext } from '../../context/context';
import UserSettingsBox from '../UserChangeScreen/UserSettingsBox';
import SignInContainer from "../SignIn/SignInContainer";
import ResourcesBox from "../ResourcesPage/ResourcesBox";

const MainPage = () => {
  const { state } = useContext<ReducerContext>(UserContext);

  useEffect(() => {
    let bubblyCanvas = document.querySelector('canvas');
    bubblyCanvas!.style.display = 'none';
    let backgroundStr = `linear-gradient(90deg, ${COLORS.PRIMARY} 45%, ${COLORS.SECONDARY} 100%)`;
    document.body.style.background = backgroundStr;
  }, []);

    let renderPage;
    if (state.currentPage == 'settings') {
        renderPage = <UserSettingsBox />
    } else if (state.currentPage == 'resources') {
        renderPage = <ResourcesBox />
    }

  return (
    <div>
      <BasicAppBar
        buttonText={`Welcome Back, ${state.user.firstName}`}
        route={''}
        title={'INSERT TITLE HERE'}
      />
        {renderPage}
    </div>
  );
};

export default MainPage;
