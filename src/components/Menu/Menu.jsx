import "./Menu.css";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../routes/routes";
import { store } from "../../store";

export const Menu = () => {
  const {
    state: { isAuth },
  } = useContext(store);

  const getNavItem = (name, path) => (
    <li key={name}>
      <NavLink to={path} exact>
        {name}
      </NavLink>
    </li>
  );

  return (
    <div className="menu">
      <ul>
        {routes.map(
          ({ name, path, publicRoute }) =>
            (publicRoute || isAuth) && getNavItem(name, path)
        )}
      </ul>
    </div>
  );
};
