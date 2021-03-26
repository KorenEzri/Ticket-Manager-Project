import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import "./HiddenCounter.css";
const useStyles = makeStyles({
  restoreButton: {
    boxShadow: "1px 1px 11px 1px #000000be",
    backgroundColor: "#282abb",
    background:
      "linear-gradient(90deg, #282abb 0%, #4d1fb8 36%, #7d31d0 100%, #4d1fb8, 100% )",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 2vw",
    cursor: "pointer",
  },
});

export default function HiddenCounter({
  hiddenCount,
  restoreAll,
  allTicketsLength,
  filterTicketsByUndone,
}) {
  const classes = useStyles();
  return (
    <div>
      <button
        id="restoreHideTickets"
        className={`${classes.restoreButton} ${classNames({
          "restore-button": true,
        })}`}
        onClick={(e) => {
          const target = e.target;
          target.classList.add("restore-button-clicked");
          setTimeout(() => {
            target.classList.remove("restore-button-clicked");
          }, 1000);
          restoreAll(e);
        }}
      >
        Restore
      </button>

      <div
        className={classNames({
          "counter-default": true,
        })}
      >
        <p className="counters">
          Hidden: <span id="hideTicketsCounter">{hiddenCount}</span>
        </p>
        <p className="counters">Total: {allTicketsLength}</p>
      </div>
      <FormControlLabel
        value="end"
        control={<Checkbox color="primary" />}
        label="Undone only"
        labelPlacement="end"
        onClick={() => {
          filterTicketsByUndone();
        }}
      />
    </div>
  );
}
