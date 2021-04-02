import React from "react";
import Label from "./Label/index";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import apolloUtils from "../../../apollo-client/apollo-utils";
import { useApolloClient } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  contentField: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0),
      width: "53.5vw",
    },
  },
  sendButton: {
    "& > *": {
      margin: theme.spacing(0),
    },
    float: "right",
    marginRight: "1vw",
    marginTop: "-4vh",
  },
  CancelButton: {
    "& > *": {
      margin: theme.spacing(0),
    },
    float: "right",
    marginRight: "16vw",
    marginTop: "-4vh",
  },
  selectDiv: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Ticket({ ticket, manageTickets }) {
  const client = useApolloClient();
  const classes = useStyles();
  const [textValue, setTextValue] = useState("");
  const [done, setDoneValue] = useState(Boolean);
  const [exapndCollapseIcon, setExpandCollapseIcon] = useState(false);
  const HandleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleBooleanChange = (event) => {
    setDoneValue(event.target.value);
  };
  const getFirstSentence = (text) => {
    const splatParagraph = text.split(".");
    const first = splatParagraph.slice(0, 2).join(".") + ".";
    const rest = splatParagraph.slice(2).join(".");
    return { first, rest };
  };
  const { first: firstSentence, rest: restOfContent } = getFirstSentence(
    ticket.content
  );
  if (!manageTickets.isEditing) {
    return (
      <li
        className="ticket"
        onDoubleClick={() => {
          manageTickets.handleEditing(ticket);
        }}
      >
        <div>
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
                {!exapndCollapseIcon && restOfContent ? (
                  <div className={"expand-collapse"}>
                    <ExpandMoreIcon />
                  </div>
                ) : (
                  (restOfContent || ticket.correspondences) && (
                    <div className={"expand-collapse"}>
                      <ExpandLessIcon />
                    </div>
                  )
                )}
              </summary>
              <p className="ticket_content">{restOfContent}</p>
              {ticket.correspondences &&
                ticket.correspondences.map((correspondence, index) => {
                  if (!correspondence) return;
                  return (
                    <span className={"response"} key={`correspondence${index}`}>
                      <p className="correspondence_date">
                        At {ticket.lastUpdated}:
                      </p>
                      <li key={`Corr:${index}`} className="correspondence">
                        {correspondence}
                      </li>
                    </span>
                  );
                })}
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
              filterTicketsByLabel={manageTickets.filterTicketsByLabel}
            />
          </ul>
          <button
            className="hideTicketButton"
            onClick={() => {
              manageTickets.hideTicket(ticket);
            }}
          >
            Hide
          </button>
        </div>
      </li>
    );
  }
  //ELSE - EDIT MODE
  else {
    return (
      <li
        className="ticket"
        onDoubleClick={() => {
          manageTickets.handleEditing(ticket);
        }}
      >
        <div className={classes.contentField}>
          <h5>Original ticket:</h5>
          <p className="ticket_content">{ticket.content}</p>
          {ticket.correspondences[0] && <h5>Past correspondences:</h5>}
          {ticket.correspondences.map((correspondence, index) => {
            if (!correspondence) return;
            return (
              <span className={"response"} key={`correspondence${index}`}>
                <p className="correspondence_date">At {ticket.lastUpdated}:</p>
                <li key={`Corr:${index}`} className="correspondence">
                  {correspondence}
                </li>
              </span>
            );
          })}
          <TextField
            label="Reply"
            type="text"
            multiline
            rows={16}
            defaultValue={``}
            variant="outlined"
            onChange={HandleTextChange}
          />
          <div className="ticket_email">
            <TextField
              label={<span className="edit-tag-span">Email to:</span>}
              type="text"
              multiline
              rows={1}
              defaultValue={ticket.userEmail}
              variant="outlined"
            />
          </div>
          <div className={classes.selectDiv}>
            <div className="ticket_done">
              <InputLabel>
                {<span className="edit-tag-span">Done:</span>}
              </InputLabel>
              <Select onChange={handleBooleanChange} value={done} type="select">
                <MenuItem value={true}>true</MenuItem>
                <MenuItem value={false}>false</MenuItem>
              </Select>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.sendButton}
            onClick={async () => {
              try {
                const {
                  data: { updateTicket },
                } = await client.mutate({
                  mutation: apolloUtils.updateTicket,
                  variables: {
                    id: ticket.id,
                    title: ticket.title,
                    labels: ticket.labels,
                    creationTime: ticket.creationTime,
                    content: ticket.content,
                    correspondences: [textValue].concat(ticket.correspondences),
                    done,
                    userEmail: ticket.userEmail,
                    lastUpdated: new Date(),
                  },
                });
                manageTickets.handleTicketList(updateTicket);
              } catch ({ message }) {
                console.log(message);
              }
              manageTickets.handleEditing(null, true);
            }}
            type="button"
          >
            Save and Send
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.CancelButton}
            onClick={async () => {
              manageTickets.handleEditing(null, true);
            }}
            type="button"
          >
            Cancel
          </Button>
        </div>
      </li>
    );
  }
}
