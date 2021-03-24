import React from "react";
import Ticket from "./Ticket/index";
export default function TicketList({ ticketList }) {
  return (
    <ul className="ticket-list">
      {ticketList.map((ticket, index) => {
        return <Ticket ticket={ticket} key={index} />;
      })}
    </ul>
  );
}
