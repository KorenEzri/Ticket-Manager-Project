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
import network from "../../../network";

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
  const classes = useStyles();
  const [textValue, setTextValue] = useState(ticket.content);
  const [done, setDoneValue] = useState(ticket.done);
  const [mailValue, setMailValue] = useState(ticket.userEmail);
  const [exapndCollapseIcon, setExpandCollapseIcon] = useState(false);
  const HandleTextChange = (event) => {
    setTextValue(event.target.value);
  };
  const handleMailChange = (event) => {
    setMailValue(event.target.value);
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
              <p className="ticket_correspondences">{ticket.correspondences}</p>
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
            Hide Ticket
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
          <h5>Past correspondences:</h5>
          {ticket.correspondences && (
            <p className="ticket_content">{ticket.replies}</p>
          )}
          <TextField
            label="Message"
            type="text"
            multiline
            rows={16}
            defaultValue={`At ${new Date()},\n
`}
            variant="outlined"
            onChange={HandleTextChange}
          />
          <div className="ticket_email">
            <TextField
              label={<span className="edit-tag-span">Email to:</span>}
              type="text"
              multiline
              rows={1}
              defaultValue={`${ticket.userEmail}`}
              variant="outlined"
              onChange={handleMailChange}
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
              const updatedTicketData = {
                title: ticket.title,
                labels: ticket.labels,
                creationTime: ticket.creationTime,
                content: ticket.content,
                correspondences: [textValue].concat(ticket.correspondences),
                done,
                userEmail: mailValue,
                lastUpdated: new Date(),
              };
              try {
                const { data } = await network.post("/api/communications", {
                  data: updatedTicketData,
                });
                manageTickets.handleTicketList(data);
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
