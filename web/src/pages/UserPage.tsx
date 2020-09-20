import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { AxiosResponse } from 'axios';
import { useHistory } from 'react-router';
import { UserCredentials, BUCKET_URL } from '@app/common';
import MainUserComponent from '../components/Dashboard/MainUserComponent';
import BasicAppBar from '../components/General/Utility/BasicAppBar';

interface Props {
  match: any;
}

const UserPage: React.FC<Props> = ({ match }) => {
  const history = useHistory();
  const [user, setUser] = useState<UserCredentials>({
    id: -1,
    email: 'loading@loading.com',
    username: 'loading',
    firstName: 'Loading',
    lastName: 'Component',
    imageURL: `${BUCKET_URL}/uploads/profile-picture/Default.png`,
    facebook: '',
    instagram: '',
    twitter: '',
    snapchat: '',
    carType: 'Loading',
    avgHighwayOver: 100,
    avgCityOver: 100,
    carbonSaved: 1000,
    routesTaken: 1000,
    routeLogs: []
  });

  useEffect(() => {
    axios
      .get(`/api/user/get/${match.params.username}`)
      .then((res: AxiosResponse) => {
        console.log(res.data);
        // Set User
        setUser(res.data);
      });
  }, [match.params.username]);

  return (
    <div>
      <BasicAppBar />
      <MainUserComponent user={user} />
    </div>
  );
};

export default UserPage;
