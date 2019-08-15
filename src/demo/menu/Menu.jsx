import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LeftDrawer from "./LeftDrawer";
import menuStyles from "./menu-styles";

class RawMenuAppBar extends React.Component {
  state = {
    drawerOpen: false
  };

  toggleDrawer = visible => () => {
    this.setState({ drawerOpen: visible });
  };

  render() {
    const { classes, onSelectMenuItem } = this.props;
    const { drawerOpen } = this.state;
    return (
      <AppBar position={"static"} className={classes.toolbar}>
        <Toolbar>
          <Hidden only={["lg", "xl"]}>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <div className={classes.flexCtr}>
            <Typography color="inherit">material-ui-jsonschema-form</Typography>
          </div>
        </Toolbar>
        <LeftDrawer
          open={drawerOpen}
          toggleDrawer={this.toggleDrawer}
          onSelectMenuItem={onSelectMenuItem}
        />
      </AppBar>
    );
  }
}
export default withStyles(menuStyles)(RawMenuAppBar);
