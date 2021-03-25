import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./HowToEdit.css";
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

export default function ExplainerCard({ helperRef }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
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
          Editing a ticket
        </Typography>
        <Typography variant="body1" component="p">
          To edit a ticket, either click the "Edit ticket" button or double
          click the ticket itself!
        </Typography>
        <Typography variant="body1" component="p">
          Keep in mind, editing is only permitted for logged-in users.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            helperRef.current.classList.add("fadeOut");
            // setShowHelp(false);
          }}
        >
          OK
        </Button>
      </CardActions>
    </Card>
  );
}
