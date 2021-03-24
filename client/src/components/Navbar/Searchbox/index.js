import React from "react";
import "./Searchbox.css";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import network from "../../../network";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
      marginTop: "-20px",
    },
  },
}));

export default function Searchbox({ setTicketList }) {
  const classes = useStyles();
  const [textInputValue, setTextInputValue] = useState("");

  const sendSearchQuery = async (searchInput) => {
    const input = searchInput.target.value;
    setTextInputValue(input);
    try {
      const { data } = await network.get(`/api/tickets?searchText=${input}`);
      console.log(data);
      setTicketList(data);
    } catch ({ message }) {
      console.log(message);
    }
  };
  return (
    <div className={classes.searchBox}>
      <TextField
        type="text"
        id="searchInput"
        value={textInputValue}
        onChange={sendSearchQuery}
        autoComplete="off"
        variant="filled"
        label="Search a ticket"
      />
    </div>
  );
}
