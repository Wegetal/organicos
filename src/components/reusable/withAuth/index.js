import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { auth } from "../../../firebase";
import * as AccountManager from "../../../firebase/account";
const withAuth = Component => {
  class WithAuth extends React.Component {
    componentDidMount() {
      const { user, history, setUser } = this.props;
      if (!user)
        auth.onAuthStateChanged(userAuth => {
          if (userAuth) {
            AccountManager.loadUser(userAuth.uid).then(user => {
              setUser(Object.assign({}, user.data(), { uid: user.id }));
            });
          } else {
            history.push("/notSign/login");
          }
        });
    }
    render() {
      return <Component {...this.props} />;
    }
  }
  const mapStateToProps = state => ({
    user: state.userState.user
  });
  const mapDispatchToPros = dispatch => ({
    setUser: user => dispatch({ type: "SET_LOGGED_USER", user })
  });
  return compose(
    connect(
      mapStateToProps,
      mapDispatchToPros
    ),
    withRouter
  )(WithAuth);
};

export default withAuth;
