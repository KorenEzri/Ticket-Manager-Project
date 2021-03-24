import React from "react";
import Searchbox from "./Searchbox/index";
export default function Navbar({ setTicketList }) {
  return (
    <div className="navbar">
      <div className="search-box_wrapper">
        <Searchbox setTicketList={setTicketList} />
      </div>
    </div>
  );
}
