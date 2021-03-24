import React from "react";
import "./TicketList.css";
import Ticket from "./Ticket/index";

export default function TicketList({ ticketList, hideTicket }) {
  return (
    <ul className="ticket-list">
      {ticketList.map((ticket, index) => {
        return <Ticket ticket={ticket} key={index} hideTicket={hideTicket} />;
      })}
    </ul>
  );
}
