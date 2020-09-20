import React from 'react';
import BasicAppBar from '../components/General/Utility/BasicAppBar';
import UserSettingsBox from '../components/UserChangeScreen/UserSettingsBox';

const SettingsPage: React.FC = () => {
  return (
    <div>
      <BasicAppBar />
      <UserSettingsBox />
    </div>
  );
};

export default SettingsPage;
