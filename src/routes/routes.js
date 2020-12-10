import { HomePage, ProfilePage, SubscriptionsPage, LoginPage } from "../pages";

export const routes = [
  { name: "home", path: "/", component: HomePage },
  {
    name: "subscriptions",
    path: "/subscriptions",
    component: SubscriptionsPage,
  },
  {
    name: "profile",
    path: "/profile",
    component: ProfilePage,
  },
  { name: "login", path: "/login", component: LoginPage, publicRoute: true },
];
