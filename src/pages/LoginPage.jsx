import { useState, useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { store } from "../store";

export const LoginPage = () => {
  const {
    state: { isAuth },
    actions,
  } = useContext(store);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  const handleClick = () => {
    if (isAuth) {
      actions.logOut();
    } else {
      actions.logIn();
      setRedirectToReferrer(true);
    }
  };

  return redirectToReferrer ? (
    <Redirect to={from} />
  ) : (
    <>
      <h1>LOGIN PAGE</h1>
      <button onClick={handleClick}>{isAuth ? "Log Out" : "Log In"}</button>
    </>
  );
};
