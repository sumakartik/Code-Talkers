import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: "#da1763",
    },
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    backgroundColor: "#12cdd4",
    color: "white",
  },
}));
function GridItem({ classes }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper className={classes.paper} textAlign="center">
        something
      </Paper>
    </Grid>
  );
}
export default function MainBody() {
  const classes = useStyles();
  return (
    <div>
      <h3> Task Bar - Admin ONLY </h3>
      <Grid container spacing={2}>
        <GridItem classes={classes} />
        <GridItem classes={classes} />
        <GridItem classes={classes} />
      </Grid>
    </div>
  );
}
