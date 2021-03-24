import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import "./HiddenCounter.css";
const useStyles = makeStyles({
  restoreButton: {
    background: "linear-gradient(45deg, #007bb8 30%, #0061a7 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(108, 135, 207, .3)",
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
        Restore tickets
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
    </div>
  );
}
