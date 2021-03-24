import React from "react";
import Label from "./Label/index";
export default function Ticket({ ticket, hideTicket }) {
  return (
    <li className="ticket">
      {`${ticket.title} \n ${ticket.content} \n ${ticket.userEmail} \n ${ticket.done} \n ${ticket.creationTime}`}
      <ul>
        {" "}
        <Label labels={ticket.labels} />
      </ul>
      <button
        className="hideTicketButton"
        onClick={() => {
          hideTicket(ticket);
        }}
      >
        Hide Ticket
      </button>
    </li>
  );
}
