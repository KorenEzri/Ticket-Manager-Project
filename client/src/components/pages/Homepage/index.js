import React from "react";
import { useEffect, useState, useRef } from "react";
import "./Homepage.css";
import TicketList from "../../TicketList/index";
import HiddenCounter from "./HiddenCounter/index";
import ExplainerCard from "../../ExplainerCards/HowToEdit/index";
import network from "../../../network";
import classNames from "classnames";
const baseUrl = `/api/tickets`;

export default function Homepage({ ticketList, setTicketList }) {
  const [hiddenCount, setHiddenCount] = useState(0);
  const [restoreBin, setRestoreBin] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const helperRef = useRef(null);
  const [isEditing, setEditing] = useState(false);

  const handleEditing = (ticket, done) => {
    if (!done) {
      setEditing(true);
    }
    if (!isEditing) {
      setTicketList([ticket]);
    } else if (done) {
      setEditing(false);
      setTicketList(restoreBin);
    }
  };
  const hideTicket = (ticket) => {
    const updatedTicketList = ticketList.filter(
      (ticketFromList) => ticketFromList.title !== ticket.title
    );
    setTicketList(updatedTicketList);
    setHiddenCount(hiddenCount + 1);
  };
  const restoreAll = () => {
    if (isEditing) {
      return;
    }
    if (hiddenCount > 0) {
      setHiddenCount(0);
    } else if (isFiltered) {
      setIsFiltered(false);
    }
    setTicketList(restoreBin);
  };
  const filterTicketsByLabel = (label) => {
    if (isEditing) {
      return;
    }
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
  const filterTicketsByUndone = () => {
    if (isEditing) {
      return;
    }
    const filteredArray = [];
    restoreBin.forEach((ticket) => {
      if (!ticket.done) {
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
      <div
        ref={helperRef}
        className={classNames({
          "explainer-edit": true,
          bounceInUp: showHelp,
        })}
      >
        {showHelp && <ExplainerCard helperRef={helperRef} />}
      </div>
      <div className="counter-wrapper">
        <HiddenCounter
          hiddenCount={hiddenCount}
          restoreAll={restoreAll}
          allTicketsLength={ticketList.length}
          filterTicketsByUndone={filterTicketsByUndone}
        />
      </div>
      <div className="ticket_list-wrapper">
        <TicketList
          ticketList={ticketList}
          hideTicket={hideTicket}
          filterTicketsByLabel={filterTicketsByLabel}
          setShowHelp={setShowHelp}
          isEditing={isEditing}
          handleEditing={handleEditing}
        />
      </div>
    </div>
  );
}
