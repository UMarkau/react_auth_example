import './App.css';
import React, {useEffect, useContext, useState} from 'react';
import {Menu} from './components/Menu';
import {Spinner} from './components/Spinner';
import {Router} from './routes/Router';
import {RefreshToken} from './api';
import {store} from './store';
import {getRefreshTokenFromLS} from './localStorageUtils';

export const App = () => {
  const {actions} = useContext(store);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshToken = getRefreshTokenFromLS();
    if (refreshToken) {
      RefreshToken(refreshToken)
        .then((response) => {
          const {
            data: {access_token},
          } = response;
          actions.authenticate(access_token, refreshToken);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="app">
      <Menu />
      <div className="app-content">
        <Router />
      </div>
    </div>
  );
};
