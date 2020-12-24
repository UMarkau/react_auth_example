import {HomePage, ProfilesPage, SubscriptionsPage, LoginPage, ProfilePage} from '../pages';

export const routes = [
  {menuName: 'home', path: '/', component: HomePage},
  {
    menuName: 'subscriptions',
    path: '/subscriptions',
    component: SubscriptionsPage,
  },
  {
    menuName: 'profiles',
    path: '/profiles',
    component: ProfilesPage,
  },
  {
    path: '/profiles/:id',
    component: ProfilePage,
  },
  {
    menuName: 'login',
    path: '/login',
    component: LoginPage,
    publicRoute: true,
  },
];
