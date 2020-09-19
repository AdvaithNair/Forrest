import React, { useEffect } from 'react';
import BasicAppBar from '../General/Utility/BasicAppBar';
import { COLORS } from '@app/common';
import { Redirect } from 'react-router-dom';

const MainPage = () => {
  useEffect(() => {
    const bubblyCanvas = document.querySelector('canvas');
    if (bubblyCanvas) bubblyCanvas!.style.display = 'none';
    // const backgroundStr = `linear-gradient(${COLORS.PRIMARY} 45%, ${COLORS.SECONDARY} 100%)`;
    // document.body.style.background = backgroundStr;
  }, []);

  return (
    <div>
      <BasicAppBar />
      <Redirect to={"/dashboard"} />
    </div>
  );
};

export default MainPage;
