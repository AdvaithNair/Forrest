import React from 'react';
import BasicAppBar from '../components/General/Utility/BasicAppBar';
import ResourcesBox from '../components/ResourcesPage/ResourcesBox';

const ResourcesPage: React.FC = () => {
  return (
    <div>
      <BasicAppBar />
      <ResourcesBox />
    </div>
  );
};

export default ResourcesPage;
