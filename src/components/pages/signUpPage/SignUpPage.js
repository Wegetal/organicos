import React from "react";
import {
  Grid,
  TextField,
  Button,
  Snackbar,
  SnackbarContent,
  withStyles,
  Icon,
  Switch,
  FormControlLabel
} from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import * as AccountManager from "../../../firebase/account";
class SignUpPage extends React.Component {
  handleEmail = event => {
    const { setUserEmail } = this.props;
    setUserEmail(event.target.value);
  };
  handlePassword = event => {
    const { setUserPassword } = this.props;
    setUserPassword(event.target.value);
  };
  handleSignUp = () => {
    const {
      name,
      email,
      password,
      type,
      setStatusMessage,
      setLoggedUser,
      history
    } = this.props;
    if (name.length < 1 || email.length < 1 || type.length < 1) {
      setStatusMessage("Todos campos devem ser preenchidos");
    }
    AccountManager.makeAccount(email, password)
      .then(sessionUser => {
        AccountManager.setUserInfo(sessionUser.user.uid, {
          name: name,
          email: email,
          password: password,
          tipo: type
        });
        AccountManager.loadUser(sessionUser.user.uid).then(user => {
          setLoggedUser({ [user.id]: user.data() });
          history.push("/");
        });
      })
      .catch(error => setStatusMessage(error.message));
  };
  handleClose = () => {
    const { setStatusMessage } = this.props;
    setStatusMessage(null);
  };
  handleText = event => {
    const { handleValue } = this.props;
    handleValue({ [event.target.name]: event.target.value });
  };
  handleSwitch = event => {
    const { handleValue } = this.props;
    handleValue({ type: event.target.checked ? "produtor" : "consumidor" });
  };
  render() {
    const { classes, email, password, status, name } = this.props;

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
                name="name"
                value={!!name ? name : ""}
                onChange={this.handleText}
                className={classes.field}
                required
                placeholder={"Digite seu nome"}
                inputProps={{ style: { fontSize: "18px" } }}
              />
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
              <div className={classes.switch}>
                <FormControlLabel
                  label="É produtor ? "
                  labelPlacement="start"
                  control={
                    <Switch
                      onChange={this.handleSwitch}
                      color="primary"
                      value={"type"}
                    />
                  }
                />
              </div>
            </div>
            <div className={classes.buttonContainer}>
              <Button
                onClick={this.handleSignUp}
                fullWidth
                className={classes.button}
              >
                Cadastrar
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
    justifyContent: "space-between"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  field: {
    margin: "10px 10px 10px 5px"
  },
  button: {
    backgroundColor: "#0bd29c",
    borderRadius: "15px"
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
  },
  switch: {
    textAlign: "left"
  }
};

const mapStateToProps = state => ({
  email: state.loginState.email,
  password: state.loginState.password,
  name: state.loginState.name,
  type: state.loginState.type === "produtor",
  status: state.loginState.status,
  user: state.userState.user
});

const mapDispatchToProps = dispatch => ({
  setLoggedUser: user => dispatch({ type: "SET_LOGGED_USER", user }),
  setUserEmail: email => dispatch({ type: "SET_USER_EMAIL", email }),
  setStatusMessage: message =>
    dispatch({ type: "SET_STATUS_MESSAGE", message }),
  setUserPassword: password =>
    dispatch({ type: "SET_USER_PASSWORD", password }),
  handleValue: value => dispatch({ type: "SET_FORM_VALUE", value })
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(style)
)(SignUpPage);
