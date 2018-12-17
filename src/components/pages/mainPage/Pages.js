import React from "react";
import { Route, Switch } from "react-router-dom";
import MapPage from "../mapPage";
import ProdutoresPage from "../produtores";
import withAuth from "../../reusable/withAuth";

class Pages extends React.Component {
  state = {
    pages: [
      {
        isExact: true,
        route: "/",
        component: <MapPage />
      },
      {
        isExact: true,
        route: "/produtores",
        component: <ProdutoresPage />
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
export default withAuth(Pages);
