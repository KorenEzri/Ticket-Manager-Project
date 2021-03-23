import React from "react";
import { useEffect, useState } from "react";
import TicketList from "../../TicketList/index";

export default function Homepage() {
  const [ticketList, setTicketList] = useState([]);

  return (
    <div className="homepage-wrapper">
      <div className="ticket_list-component">
        <TicketList ticketList={ticketList} />
      </div>
    </div>
  );
}
