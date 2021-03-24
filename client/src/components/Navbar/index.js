import React from "react";
import "./Navbar.css";
import Searchbox from "./Searchbox/index";
import AppBar from "@material-ui/core/AppBar";
import { fade, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Navbar({ setTicketList }) {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className="navbar">
        <Typography variant="h5" className={`${classes.title} ${"title"}`}>
          Ticket Manager
        </Typography>
        <div className="search-box_wrapper">
          <Searchbox setTicketList={setTicketList} />
        </div>
      </AppBar>
    </div>
  );
}
