import {useState, useContext} from 'react';
import {Redirect, useLocation} from 'react-router-dom';
import {store} from '../store';

export const LoginPage = () => {
  const {
    state: {isAuth},
    actions,
  } = useContext(store);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const location = useLocation();

  const {from} = location.state || {from: {pathname: '/'}};

  const handleClick = async () => {
    if (isAuth) {
      actions.logOut();
    } else {
      const {username, password} = credentials;
      await actions.logIn(username, password);
      setRedirectToReferrer(true);
    }
  };

  const handleChange = (event) => {
    const {
      target: {name, value},
    } = event;
    setCredentials({...credentials, [name]: value});
  };

  return redirectToReferrer ? (
    <Redirect to={from} />
  ) : (
    <>
      <h1>LOGIN PAGE</h1>
      {!isAuth && (
        <>
          <input type="text" placeholder="Username" name="username" onChange={handleChange} />
          <input type="password" placeholder="Password" name="password" onChange={handleChange} />
        </>
      )}
      <button onClick={handleClick}>{isAuth ? 'Log Out' : 'Log In'}</button>
    </>
  );
};
