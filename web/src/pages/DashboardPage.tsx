import React from 'react';
import BasicAppBar from '../components/General/Utility/BasicAppBar';
import DashboardBox from '../components/Dashboard/DashboardBox';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <BasicAppBar />
      <DashboardBox />
    </div>
  );
};

export default DashboardPage;
