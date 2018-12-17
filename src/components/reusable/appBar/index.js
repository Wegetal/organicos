import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
  Icon,
  IconButton
} from "@material-ui/core";

class AppToolbar extends React.Component {
  handleOpen = () => this.props.handleDrawer(true);
  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.app} position="static">
        <Toolbar variant="dense">
          <IconButton
            onClick={this.handleOpen}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography className={classes.grow} variant="h6" color="inherit">
            Orgânicos
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const style = () => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  },
  app: {
    backgroundColor: "#0bd29c"
  }
});
export default withStyles(style)(AppToolbar);
