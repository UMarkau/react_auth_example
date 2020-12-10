import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { NotFoundPage } from "../pages";
import { routes } from "./routes";

export const Router = () => (
  <Switch>
    {routes.map(({ path, component, publicRoute }) =>
      publicRoute ? (
        <Route key={path} exact {...{ path, component }} />
      ) : (
        <ProtectedRoute key={path} exact {...{ path, component }} />
      )
    )}
    <Route component={NotFoundPage} />
  </Switch>
);
