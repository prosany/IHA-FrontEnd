import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoutes from "Routes/Middlewares";
import publicRoutes, { privateRoutes } from "./Routes/Routes";
import Layout from "./Layouts";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {publicRoutes.map((route, index) => (
            <Route
              exact
              path={route.path}
              component={route.component}
              key={index}
            />
          ))}

          {privateRoutes.map((route, index) => (
            <ProtectedRoutes
              exact
              path={route.path}
              component={route.component}
              key={index}
              layout={Layout}
              isPrivate={true}
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
