import Loader from "react-loader";
import React from "react";
import "./TicketList.css";
import Ticket from "./Ticket/index";

function TicketList({ manageTickets }) {
  let showTickets;
  if (manageTickets.i < 197) {
    showTickets = manageTickets.ticketList.slice(0, manageTickets.i);
  } else {
    manageTickets.i = false;
  }
  return (
    <div
      className="wrapper"
      onClick={() => {
        manageTickets.showHelpCards(true);
      }}
    >
      <ul className="ticket-list">
        {showTickets
          ? showTickets.map((ticket, index) => {
              if (manageTickets.showMore) {
                return (
                  <div className="relative-position-loader-div">
                    {index === showTickets.length - 1 ? (
                      <Loader className="show-more-loader"></Loader>
                    ) : null}
                    <Ticket
                      ticket={ticket}
                      key={index}
                      manageTickets={manageTickets}
                    />
                  </div>
                );
              }
              return (
                <Ticket
                  ticket={ticket}
                  key={index}
                  manageTickets={manageTickets}
                />
              );
            })
          : manageTickets.ticketList.map((ticket, index) => {
              return (
                <Ticket
                  ticket={ticket}
                  key={index}
                  manageTickets={manageTickets}
                />
              );
            })}
      </ul>
    </div>
  );
}
export default React.memo(TicketList);
