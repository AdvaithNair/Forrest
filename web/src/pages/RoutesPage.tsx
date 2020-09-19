import React from 'react';
import BasicAppBar from '../components/General/Utility/BasicAppBar';
import UserRoutesBox from "../components/UserRoutes/RoutesBox";

const RoutesPage: React.FC = () => {
  return (
    <div>
      <BasicAppBar />
      <UserRoutesBox />
    </div>
  );
};

export default RoutesPage;
