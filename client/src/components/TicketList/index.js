import React from "react";
import Ticket from "./Ticket/index";
export default function TicketList({ ticketList }) {
  return (
    <ul className="ticket-list">
      return (
      {ticketList.map((ticket, index) => {
        <Ticket ticket={ticket} key={index} />;
      })}
      )
    </ul>
  );
}
