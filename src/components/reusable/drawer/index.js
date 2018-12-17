import React from "react";
import { Drawer, MenuList, MenuItem, withStyles } from "@material-ui/core";

class NaviDrawer extends React.Component {
  handleClose = () => this.props.handleDrawer(false);
  onSwicthPage = path => {
    const { match, history } = this.props;
    if (match.url === path) return;
    else history.push(path);
  };
  render() {
    const { classes, toogle } = this.props;

    return (
      <Drawer
        open={!!toogle}
        classes={{
          paper: classes.drawer
        }}
        onClose={this.handleClose}
        anchor="left"
      >
        <div>
          <MenuList className={classes.menu}>
            {[
              { label: "Feiras", path: "" },
              { label: "Produtores", path: "produtores" }
            ].map((item, index) => (
              <MenuItem
                style={{
                  backgroundColor: "rgba(13, 179, 134, 0.1)",
                  color: "#fff",
                  fontWeight: "500"
                }}
                onClick={() => this.onSwicthPage(item.path)}
                key={index}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        </div>
      </Drawer>
    );
  }
}
const style = () => ({
  drawer: {
    width: "200px",
    backgroundColor: "#0bd29c"
  }
});
export default withStyles(style)(NaviDrawer);
