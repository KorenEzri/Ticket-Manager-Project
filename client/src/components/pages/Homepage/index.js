import React from "react";
import { useEffect, useState, useRef } from "react";
import "./Homepage.css";
import TicketList from "../../TicketList/index";
import HiddenCounter from "./HiddenCounter/index";
import ExplainerCard from "../../ExplainerCards/HowToEdit/index";
import Loader from "react-loader";
import network from "../../../network";
import classNames from "classnames";
const baseUrl = `/api/tickets`;

export default function Homepage() {
  const [ticketList, setTicketList] = useState([]);
  const [hiddenCount, setHiddenCount] = useState(0);
  const [restoreBin, setRestoreBin] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [showHelp, showHelpCards] = useState(false);
  const helperRef = useRef(null);
  const [isEditing, setEditing] = useState(false);
  const [loaded, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [i, setIndex] = useState(3);

  const handleTicketList = (list) => {
    setRestoreBin(list);
    setTicketList(list);
  };
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
    } else if (isFiltered) {
      restoreAll();
      return;
    }
    const filteredArray = [];
    restoreBin.forEach((ticket) => {
      if (!ticket.done) {
        filteredArray.push(ticket);
      }
      setIsFiltered(true);
      setTicketList(filteredArray);
    });
  };
  const handleScrollEvent = () => {
    const offSet = window.pageYOffset;
    const pageScrollLimit = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    if (offSet > pageScrollLimit - 960 && !isEditing) {
      setShowMore(true);
      setTimeout(() => {
        setIndex(i + 3);
        setShowMore(false);
      }, 800);
    }
  };
  const manageTickets = {
    ticketList,
    handleTicketList,
    hideTicket,
    filterTicketsByLabel,
    showHelpCards,
    isEditing,
    handleEditing,
    i,
    setIndex,
    showMore,
  };

  useEffect(() => {
    (async () => {
      if (isEditing) {
        return;
      }
      setLoading(false);
      const { data } = await network.get(`${baseUrl}`);
      setTicketList(data);
      setRestoreBin(data);
      setLoading(true);
    })();
  }, [setTicketList, isEditing, setIndex]);
  window.onscroll = () => {
    handleScrollEvent();
  };

  return (
    <div className="homepage-wrapper">
      <div
        id="explain-cards-div"
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
        <Loader loaded={loaded}>
          <TicketList manageTickets={manageTickets} />
        </Loader>
      </div>
    </div>
  );
}
