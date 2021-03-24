import React from "react";
import { useEffect, useState } from "react";
import network from "../../../network";

export default function Searchbox({ setTicketList }) {
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
    <input
      type="text"
      placeholder="Search"
      id="searchInput"
      value={textInputValue}
      onChange={sendSearchQuery}
      autoComplete="off"
    />
  );
}
