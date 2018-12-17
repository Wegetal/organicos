import React from "react";
import {
  Grid,
  TextField,
  Button,
  Snackbar,
  SnackbarContent,
  withStyles,
  Icon
} from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import * as AccountManager from "../../../firebase/account";
class LoginPage extends React.Component {
  handleEmail = event => {
    const { setUserEmail } = this.props;
    setUserEmail(event.target.value);
  };
  handlePassword = event => {
    const { setUserPassword } = this.props;
    setUserPassword(event.target.value);
  };
  handleLogin = () => {
    const {
      email,
      password,
      setStatusMessage,
      setLoggedUser,
      history
    } = this.props;
    AccountManager.makeLogin(email, password)
      .then(sessionInfo => {
        AccountManager.loadUser(sessionInfo.user.uid).then(user => {
          setLoggedUser(Object.assign({}, user.data(), { uid: user.id }));
          history.push("/");
        });
      })
      .catch(error => setStatusMessage(error.message));
  };
  handleClose = () => {
    const { setStatusMessage } = this.props;
    setStatusMessage(null);
  };
  handleSignUp = () => {
    const { history } = this.props;
    history.push("/notSign/signup");
  };
  render() {
    const { classes, email, password, status } = this.props;

    return (
      <div className={classes.root}>
        <Grid container className={classes.container}>
          <Grid item xs={10} md={6} lg={4} className={classes.item}>
            <div>
              <img
                className={classes.img}
                alt="Organicos Logo"
                src="https://drive.google.com/uc?id=1rldic6F1_Rj-GaZekPVmJSQiXDbb-r69"
              />
            </div>
            <div className={classes.form}>
              <TextField
                fullWidth
                value={!!email ? email : ""}
                onChange={this.handleEmail}
                className={classes.field}
                required
                placeholder={"Digite seu email"}
                inputProps={{ style: { fontSize: "18px" } }}
              />
              <TextField
                fullWidth
                value={!!password ? password : ""}
                onChange={this.handlePassword}
                className={classes.field}
                type={"password"}
                required
                placeholder={"Digite sua senha"}
                inputProps={{ style: { fontSize: "18px" } }}
              />
            </div>
            <div className={classes.buttonContainer}>
              <Button onClick={this.handleSignUp} className={classes.button}>
                Cadastrar
              </Button>
              <Button onClick={this.handleLogin} className={classes.button}>
                Login
              </Button>
            </div>
          </Grid>
        </Grid>
        {status && (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            open={!!status}
            autoHideDuration={4000}
            onClose={this.handleClose}
          >
            <SnackbarContent
              className={classes.snackbar}
              message={
                <span className={classes.message}>
                  <Icon className={classes.icon}>info</Icon>
                  {status}
                </span>
              }
              action={
                <Icon
                  className={classes.closeAction}
                  onClick={this.handleClose}
                >
                  clear
                </Icon>
              }
            />
          </Snackbar>
        )}
      </div>
    );
  }
}

const style = {
  root: {
    height: "100vh",
    backgroundColor: "#f1f1f1"
  },
  container: {
    height: "100%"
  },
  item: {
    margin: "auto"
  },
  buttonContainer: {
    marginTop: "8px",
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "15px",
    backgroundColor: "#0bd29c"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  field: {
    margin: "10px 10px 10px 5px"
  },
  button: {
    width: "50%"
  },
  label: {
    fontSize: "20px"
  },
  snackbar: {
    backgroundColor: "#d32f2f"
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    margin: "4px"
  },
  closeAction: {
    cursor: "pointer"
  },
  img: {
    maxHeigth: "100%",
    maxWidth: "100%"
  }
};

const mapStateToProps = state => ({
  email: state.loginState.email,
  password: state.loginState.password,
  status: state.loginState.status,
  user: state.userState.user
});

const mapDispatchToProps = dispatch => ({
  setLoggedUser: user => dispatch({ type: "SET_LOGGED_USER", user }),
  setUserEmail: email => dispatch({ type: "SET_USER_EMAIL", email }),
  setStatusMessage: message =>
    dispatch({ type: "SET_STATUS_MESSAGE", message }),
  setUserPassword: password => dispatch({ type: "SET_USER_PASSWORD", password })
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(style)
)(LoginPage);
