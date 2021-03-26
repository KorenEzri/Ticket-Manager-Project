import React from "react";
import "./TicketList.css";
import Ticket from "./Ticket/index";

export default function TicketList({
  ticketList,
  hideTicket,
  filterTicketsByLabel,
  setShowHelp,
  isEditing,
  handleEditing,
}) {
  return (
    <div
      className="wrapper"
      onClick={() => {
        setShowHelp(true);
      }}
    >
      <ul className="ticket-list">
        {ticketList.map((ticket, index) => {
          return (
            <Ticket
              isEditing={isEditing}
              handleEditing={handleEditing}
              ticket={ticket}
              key={index}
              hideTicket={hideTicket}
              filterTicketsByLabel={filterTicketsByLabel}
            />
          );
        })}
      </ul>
    </div>
  );
}
