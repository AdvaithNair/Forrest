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
  currentPage: string;
  user: UserCredentials;
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
}

// Axios Response
export interface AxiosResponse {
  data: any;
}

// Axios Error
export interface AxiosError {
  response: AxiosErrorData;
}
interface AxiosErrorData {
  data: AxiosErrorMessage;
}
interface AxiosErrorMessage {
  error: string;
}
