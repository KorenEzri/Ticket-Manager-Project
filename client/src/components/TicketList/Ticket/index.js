import React from "react";
import Label from "./Label/index";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useState } from "react";

export default function Ticket({ ticket, hideTicket, filterTicketsByLabel }) {
  const getFirstSentence = (text) => {
    const splatParagraph = text.split(".");
    const first = splatParagraph.slice(0, 2).join(".") + ".";
    const rest = splatParagraph.slice(2).join(".");
    return { first, rest };
  };
  const [exapndCollapseIcon, setExpandCollapseIcon] = useState(false);
  const { first: firstSentence, rest: restOfContent } = getFirstSentence(
    ticket.content
  );
  return (
    <li className="ticket">
      <p className="ticket_title">{`${ticket.title}`}</p>
      <div className="ticket_content-div">
        <details className="ticket_details">
          <summary
            className="ticket_content-summary"
            onClick={() => {
              setExpandCollapseIcon(!exapndCollapseIcon);
            }}
          >
            {firstSentence}
            {!exapndCollapseIcon ? (
              <div className={"expand-collapse"}>
                <ExpandMoreIcon />
              </div>
            ) : (
              <div className={"expand-collapse"}>
                <ExpandLessIcon />
              </div>
            )}
          </summary>
          <p className="ticket_content">{restOfContent}</p>
        </details>
      </div>
      <p className="ticket_email">
        <span className="tag-span">Email: </span>
        {`${ticket.userEmail}`}
      </p>
      <p className="ticket_done">
        <span className="tag-span">Done: </span>
        {`${ticket.done}`}
      </p>
      <p className="ticket_date">
        <span className="tag-span">Created at: </span>
        {`${ticket.creationTime}`}
      </p>
      <ul>
        <Label
          labels={ticket.labels}
          filterTicketsByLabel={filterTicketsByLabel}
        />
      </ul>
      <button
        className="hideTicketButton"
        onClick={() => {
          hideTicket(ticket);
        }}
      >
        Hide Ticket
      </button>
    </li>
  );
}
