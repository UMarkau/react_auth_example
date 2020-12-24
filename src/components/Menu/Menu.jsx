import './Menu.css';
import {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {routes} from '../../routes/routes';
import {store} from '../../store';

export const Menu = () => {
  const {
    state: {isAuth},
  } = useContext(store);

  const getNavItem = (menuName, path) => {
    const isExact = path === '/';
    return (
      <li key={menuName}>
        <NavLink to={path} exact={isExact}>
          {menuName}
        </NavLink>
      </li>
    );
  };

  return (
    <div className="menu">
      <ul>
        {routes.map(
          ({menuName, path, publicRoute}) => (publicRoute || isAuth) && menuName && getNavItem(menuName, path)
        )}
      </ul>
    </div>
  );
};
