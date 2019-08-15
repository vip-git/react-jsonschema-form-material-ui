import React from "react";
import keys from "lodash/keys";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import examples from "../examples";

import menuStyles from "./menu-styles";

export default withStyles(menuStyles)(
  ({ toggleDrawer, classes, onSelectMenuItem }) => (
    <div
      tabIndex={0}
      role="button"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className={classes.drawerList}
    >
      <List subheader={<ListSubheader component="div">Showcase</ListSubheader>}>
        {keys(examples).map(e => (
          <ListItem key={e} button>
            <ListItemText
              primary={examples[e].title}
              onClick={onSelectMenuItem(examples[e])}
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
);
