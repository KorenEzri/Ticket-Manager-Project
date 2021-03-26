import React from "react";
import "./TicketList.css";
import Ticket from "./Ticket/index";

export default function TicketList({ manageTickets }) {
  return (
    <div
      className="wrapper"
      onClick={() => {
        manageTickets.showHelpCards(true);
      }}
    >
      <ul className="ticket-list">
        {manageTickets.ticketList.map((ticket, index) => {
          return (
            <Ticket ticket={ticket} key={index} manageTickets={manageTickets} />
          );
        })}
      </ul>
    </div>
  );
}
