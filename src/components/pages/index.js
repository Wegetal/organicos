import React from "react";
import { Route, Switch } from "react-router-dom";
import PreSignPage from "./preSignInPage";
import MainPage from "./mainPage";

class Pages extends React.Component {
  state = {
    pages: [
      {
        isExact: false,
        route: "/notSign/:type",
        component: <PreSignPage />
      },
      {
        isExact: false,
        route: "/",
        component: <MainPage />
      }
    ]
  };
  render() {
    const { pages } = this.state;
    return (
      <Switch>
        {pages.map(item => (
          <Route
            exact={item.isExact}
            key={item.route}
            path={item.route}
            component={() => item.component}
          />
        ))}
      </Switch>
    );
  }
}
export default Pages;
