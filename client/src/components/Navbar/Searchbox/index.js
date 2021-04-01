import React from "react";
import "./Searchbox.css";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import apolloUtils from "../../../apollo-client/apollo-utils";
import { useApolloClient } from "@apollo/client";
let times;

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
  const debounce = (func, time) => {
    clearTimeout(times);
    times = setTimeout(func, time);
  };
  const client = useApolloClient();
  const classes = useStyles();
  const [textInputValue, setTextInputValue] = useState("");
  const handleSearchInput = (searchInput) => {
    const input = searchInput.target.value;
    setTextInputValue(input);
    debounce(() => {
      sendSearchQuery(input);
    }, 250);
  };
  const sendSearchQuery = async (input) => {
    try {
      const {
        data: { searchTickets },
      } = await client.query({
        query: apolloUtils.searchTickets,
        variables: { input: `${input}` },
      });
      console.log(searchTickets);
      setTicketList(searchTickets);
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
        onChange={handleSearchInput}
        autoComplete="off"
        variant="filled"
        label="Search by tags or title"
      />
    </div>
  );
}
