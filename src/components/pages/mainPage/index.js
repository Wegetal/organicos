import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import withAuth from "../../reusable/withAuth";
import Pages from "./Pages";
import NaviDrawer from "../../reusable/drawer";
import AppToolbar from "../../reusable/appBar";
import "./css/base.css";
import "./css/app.css";

class MainPage extends React.Component {
  render() {
    const { classes, toogle, setNaviState, history, match } = this.props;

    return (
      <div className={classes.root}>
        <div className="base">
          <NaviDrawer
            toogle={toogle}
            handleDrawer={setNaviState}
            history={history}
            match={match}
          />
          <AppToolbar handleDrawer={setNaviState} />
        </div>
        <div className="app">
          <Pages />
        </div>
      </div>
    );
  }
}
const styles = () => ({
  content: {
    flexGrow: 1,
    backgroundColor: "#fff"
  },
  root: {
    height: "100%",
    flexGrow: 1
  }
});
const mapStateToProps = state => ({
  toogle: state.navigationState.toogle
});
const mapDispatchToProps = dispatch => ({
  setNaviState: value => dispatch({ type: "TOOGLE_NAVIGATION_BAR", value })
});
export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withAuth
)(MainPage);
