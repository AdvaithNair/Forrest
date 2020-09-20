import React, { createContext, useReducer, useMemo } from 'react';
import { reducer } from './reducer';
import {
  GlobalState,
  ReducerContext,
  BUCKET_URL,
  USER_DRIVE_DEFAULTS
} from '@app/common';

// Initial State Object
export const initialState: GlobalState = {
  authenticated: false,
  loading: false,
  isSignup: false,
  darkMode: true,
  homePage: true,
  currentRoute: {
    route: '',
    co2saved: 0,
    duration: 0,
    startingLoc: {
      lat: 0,
      lng: 0
    },
    endingLoc: {
      lat: 0,
      lng: 0
    }
  },
  currentPage: 'dashboard',
  user: {
    id: -1,
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    imageURL: `${BUCKET_URL}/uploads/profile-picture/Default.png`,
    facebook: '',
    instagram: '',
    twitter: '',
    snapchat: '',
    carType: USER_DRIVE_DEFAULTS.VEHICLE_TYPE,
    avgHighwayOver: USER_DRIVE_DEFAULTS.AVERAGE_MPH_OVER_HIGHWAY,
    avgCityOver: USER_DRIVE_DEFAULTS.AVERAGE_MPH_OVER_CITY,
    carbonSaved: 0,
    routesTaken: 0,
    routeLogs: []
  }
};

// Context Creation
export const UserContext = createContext<ReducerContext>({
  state: initialState,
  dispatch: (argument: { [k: string]: any }) => {}
});

// Props to allow for props
interface Props {
  props?: any;
}

// User Provider for Global Storage
const UserProvider: React.FC<Props> = (props: any) => {
  // Global User State
  const [state, dispatch] = useReducer(reducer, initialState);

  // Memo for Efficiency
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  // const contextValue = { state, dispatch };

  // Provider Wrapping
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
