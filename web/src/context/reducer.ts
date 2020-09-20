import STATE from './state';
import { initialState } from './context';

// dispatch({ type: STATE.soemthign, payload: res.data });

// Reducer Function
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case STATE.SET_SIGNUP:
      return {
        ...state,
        isSignup: true
      };
    case STATE.SET_SIGNIN:
      return {
        ...state,
        isSignup: false
      };
    case STATE.AUTH:
      return {
        ...state,
        authenticated: true
      };
    case STATE.NOT_AUTH:
      return {
        ...state,
        authenticated: false
      };
    case STATE.SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true
      };
    case STATE.CLEAR_USER:
      return initialState;
    case STATE.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case STATE.CLEAR_LOADING:
      return {
        ...state,
        loading: false
      };
    case STATE.SET_UPLOAD_IMAGE:
      return {
        ...state,
        user: {
          ...state.user,
          imageURL: action.payload
        }
      };
    case STATE.TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode
      };
    case STATE.SET_VIEW_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    case STATE.VIEW_HOME_PAGE:
      return {
        ...state,
        homePage: true
      };
    case STATE.VIEW_WEB_APP:
      return {
        ...state,
        homePage: false
      };
    case STATE.SET_CURRENT_ROUTE:
      return {
        ...state,
        currentRoute: action.payload
      };
    case STATE.CLEAR_CURRENT_ROUTE:
      return {
        ...state,
        currentRoute: initialState.currentRoute
      };
    case STATE.ADD_ROUTE:
      return {
        ...state,
        user: {
          ...state.user,
          routeLogs: [
            {
              userID: action.payload.userID,
              route: action.payload.route,
              date: action.payload.date,
              carType: action.payload.carType,
              avgHighwayOver: action.payload.avgHighwayOver,
              avgCityOver: action.payload.avgCityOver,
              carbonSaved: action.payload.carbonSaved,
              estimatedDuration: action.payload.estimatedDuration,
              verified: action.payload.verified
            },
            ...state.user.routeLogs
          ]
        }
      };
    case STATE.CONFIRM_ROUTE:
      return {
        ...state,
        user: {
          ...state.user,
          routesTaken: state.user.routesTaken + 1,
          carbonSaved: state.user.carbonSaved + action.payload.carbonSaved,
          routeLogs: [
            {
              userID: action.payload.userID,
              route: action.payload.route,
              date: action.payload.date,
              carType: action.payload.carType,
              avgHighwayOver: action.payload.avgHighwayOver,
              avgCityOver: action.payload.avgCityOver,
              carbonSaved: action.payload.carbonSaved,
              estimatedDuration: action.payload.estimatedDuration,
              verified: action.payload.verified
            },
            ...state.user.routeLogs
          ]
        }
      };
    default:
      return state;
  }
};

export default reducer;
