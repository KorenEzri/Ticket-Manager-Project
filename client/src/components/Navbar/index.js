import React from "react";
import Searchbox from "./Searchbox/index";
export default function Navbar() {
  return (
    <div className="navbar">
      <div className="search-box_wrapper">
        <Searchbox />
      </div>
    </div>
  );
}
