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
    padding: "0 30px",
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
      <div
        className={classNames({
          "counter-default": true,
        })}
      >
        <p>
          Hidden: <span id="hideTicketsCounter">{hiddenCount}</span>
        </p>
        <p>Total: {allTicketsLength}</p>
      </div>
      <button
        id="restoreHideTickets"
        className={`${classes.restoreButton} ${classNames({
          "restore-button": true,
        })}`}
        onClick={async () => {
          await restoreAll();
        }}
      >
        Restore tickets
      </button>
    </div>
  );
}
