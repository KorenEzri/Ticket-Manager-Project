import React from "react";
import { useEffect, useState } from "react";
import TicketList from "../../TicketList/index";
import network from "../../../network";
const baseUrl = `/api/tickets/`;

export default function Homepage() {
  const [ticketList, setTicketList] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await network.get(`${baseUrl}`);
      setTicketList(data);
    })();
  }, []);

  return (
    <div className="homepage-wrapper">
      <div className="ticket_list-component">
        <TicketList ticketList={ticketList} />
      </div>
    </div>
  );
}
