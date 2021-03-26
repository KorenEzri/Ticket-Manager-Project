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

const getFirstSentence = (text) => {
  const splatParagraph = text.split(".");
  const first = splatParagraph.slice(0, 2).join(".") + ".";
  const rest = splatParagraph.slice(2).join(".");
  return { first, rest };
};

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

  const { first: firstSentence, rest: restOfContent } = getFirstSentence(
    ticket.content
  );
  return (
    <li
      className="ticket"
      onDoubleClick={() => {
        manageTickets.handleEditing(ticket);
      }}
    >
      {!manageTickets.isEditing ? (
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
                  restOfContent && (
                    <div className={"expand-collapse"}>
                      <ExpandLessIcon />
                    </div>
                  )
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
      ) : (
        <div className={classes.contentField}>
          <TextField
            label="Message"
            type="text"
            multiline
            rows={16}
            defaultValue={` ${ticket.content} \n\n At ${new Date()}, \n  
Reply: `}
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
                content: textValue,
                done,
                userEmail: mailValue,
                lastUpdated: new Date(),
              };
              try {
                await network.post("/api/communications", {
                  data: updatedTicketData,
                });
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
      )}
    </li>
  );
}
