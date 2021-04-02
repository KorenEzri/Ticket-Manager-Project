import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import "./HowToUserAuth.css";
const useStyles = makeStyles({
  root: {
    backgroundColor: "whitesmoke",
    maxWidth: 190,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function HowToUserAuth({ helperRef }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          How to?
        </Typography>
        <Typography variant="h6" component="h2">
          Logging In
        </Typography>
        <Typography variant="body1" component="p">
          To log in, enter your username and password.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            helperRef.current.classList.add("fadeOut");
          }}
        >
          OK
        </Button>
        <a className="redirect-link" href="/register" size="small">
          I don't have an account
        </a>
      </CardActions>
    </Card>
  );
}
