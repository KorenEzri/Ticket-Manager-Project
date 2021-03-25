import React from "react";
import { useEffect, useState } from "react";
import "./Homepage.css";
import TicketList from "../../TicketList/index";
import HiddenCounter from "./HiddenCounter/index";
import network from "../../../network";
const baseUrl = `/api/tickets`;

export default function Homepage({ ticketList, setTicketList }) {
  const [hiddenCount, setHiddenCount] = useState(0);
  const [restoreBin, setRestoreBin] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const hideTicket = (ticket) => {
    const updatedTicketList = ticketList.filter(
      (ticketFromList) => ticketFromList.title !== ticket.title
    );
    setTicketList(updatedTicketList);
    setHiddenCount(hiddenCount + 1);
  };
  const restoreAll = () => {
    if (hiddenCount > 0) {
      setHiddenCount(0);
    } else if (isFiltered) {
      setIsFiltered(false);
    }
    setTicketList(restoreBin);
  };
  const filterTicketsByLabel = (label) => {
    const filteredArray = [];
    restoreBin.forEach((ticket) => {
      if (ticket.labels.includes(label)) {
        filteredArray.push(ticket);
      }
      setIsFiltered(true);
      setTimeout(() => {
        setTicketList(filteredArray);
      }, 800);
    });
  };

  useEffect(() => {
    (async () => {
      const { data } = await network.get(`${baseUrl}`);
      setTicketList(data);
      setRestoreBin(data);
    })();
  }, []);

  return (
    <div className="homepage-wrapper">
      <div className="counter-wrapper">
        <HiddenCounter
          hiddenCount={hiddenCount}
          restoreAll={restoreAll}
          allTicketsLength={ticketList.length}
        />
      </div>
      <div className="ticket_list-wrapper">
        <TicketList
          ticketList={ticketList}
          hideTicket={hideTicket}
          filterTicketsByLabel={filterTicketsByLabel}
        />
      </div>
    </div>
  );
}
