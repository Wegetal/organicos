import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../loginPage";
import SignUpPage from "../signUpPage/SignUpPage";

class PreSignPage extends React.Component {
  state = {
    pages: [
      {
        isExact: true,
        route: "/notSign/login",
        component: <LoginPage />
      },
      { isExact: true, route: "/notSign/signup", component: <SignUpPage /> }
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
export default PreSignPage;
