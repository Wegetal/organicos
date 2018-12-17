import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { BrowserRouter as Route } from "react-router-dom";
import "./App.css";
import Pages from "./components/pages";
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Route>
          <Pages />
        </Route>
      </div>
    );
  }
}

const style = () => ({
  root: {
    height: "100vh",
    backgroundColor: "#f1f1f1"
  }
});

export default withStyles(style)(App);
