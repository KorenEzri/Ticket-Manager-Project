import React from "react";

export default function Ticket({ ticket }) {
  return (
    <li className="ticket">
      {`${ticket.title} \n ${ticket.content} \n ${ticket.userEmail} \n ${ticket.done} \n ${ticket.creationTime} \n ${ticket.labels}`}
    </li>
  );
}
