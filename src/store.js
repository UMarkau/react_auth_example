import {createContext, useReducer} from 'react';
import {API, SetAuthenticationHeader} from './api';
import {setRefreshTokenToLS} from './localStorageUtils';

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

const initialState = {isAuth: false};

const store = createContext(initialState);
const {Provider} = store;

const reducer = (state, action) => {
  switch (action.type) {
    case LOG_IN:
      return {...state, isAuth: true};
    case LOG_OUT:
      return {...state, isAuth: false};
    default:
      return state;
  }
};

const actions = (dispatch) => ({
  authenticate: (accessToken, refreshToken) => {
    setRefreshTokenToLS(refreshToken);
    SetAuthenticationHeader(accessToken);
    dispatch({type: LOG_IN});
  },
  logIn: function (username, password) {
    return API.logIn(username, password).then(
      (response) => {
        const {data: {access_token, refresh_token} = {}} = response;
        this.authenticate(access_token, refresh_token);
        return Promise.resolve();
      },
      (error) => {
        // Do something
      }
    );
  },
  logOut: () => {
    dispatch({type: LOG_OUT});
  },
});

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{state, actions: actions(dispatch)}}>{children}</Provider>;
};

export {store, StoreProvider};
