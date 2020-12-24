import {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {store} from '../store';

export const ProtectedRoute = ({component: Component, ...rest}) => {
  const {
    state: {isAuth},
  } = useContext(store);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
};
