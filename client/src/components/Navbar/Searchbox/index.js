import React from "react";
import "./Searchbox.css";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import network from "../../../network";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
let cancelToken;

const useStyles = makeStyles((theme) => ({
  searchBox: {
    "& > *": {
      margin: theme.spacing(1),
      width: "28vw",
      marginTop: "-22px",
      marginLeft: "12px",
      float: "right",
    },
  },
}));

export default function Searchbox({ setTicketList }) {
  const classes = useStyles();
  const [textInputValue, setTextInputValue] = useState("");

  const sendSearchQuery = async (searchInput) => {
    const input = searchInput.target.value;
    setTextInputValue(input);
    if (cancelToken) {
      cancelToken.cancel("Operation canceled due to new request.");
    }
    cancelToken = axios.CancelToken.source();
    try {
      const { data } = await network.get(`/api/tickets?searchText=${input}`, {
        cancelToken: cancelToken.token,
      });
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
        label="Search by tags or title"
      />
    </div>
  );
}
