export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

// Context State
export interface GlobalState {
  authenticated: boolean;
  loading: boolean;
  homePage: boolean;
  isSignup: boolean;
  darkMode: boolean;
  currentRoute: CurrentRoute;
  currentPage: string;
  user: UserCredentials;
}

export interface CurrentRoute {
  route: string;
  co2saved: number;
  duration: number;
  startingLoc: DataPoints;
  endingLoc: DataPoints;
}

export interface DataPoints {
  lat: number;
  lng: number;
}

// Context Reducer
export interface ReducerContext {
  state: GlobalState;
  dispatch: ({}) => void;
}

// User Credentials for Context State
export interface UserCredentials {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  imageURL: string;
  facebook: string;
  instagram: string;
  twitter: string;
  snapchat: string;
  carType: string;
  avgHighwayOver: number;
  avgCityOver: number;
  carbonSaved: number;
  routesTaken: number;
  routeLogs: RouteLog[];
}

export interface RouteLog {
  userID: number;
  route: string;
  date: string;
  carType: string;
  avgHighwayOver: number;
  avgCityOver: number;
  carbonSaved: number;
  estimatedDuration: number;
  verified: boolean;
}
