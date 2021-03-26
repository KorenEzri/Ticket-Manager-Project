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
    marginRight: "24px",
    marginTop: "6px",
  },
  selectDiv: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Ticket({
  ticket,
  hideTicket,
  filterTicketsByLabel,
  isEditing,
  handleEditing,
}) {
  const classes = useStyles();
  const [value, setValue] = useState("Controlled");
  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

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
    <li
      className="ticket"
      onDoubleClick={() => {
        handleEditing(ticket);
      }}
    >
      {!isEditing ? (
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
        </div>
      ) : (
        <div className={classes.contentField}>
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={16}
            defaultValue={`${ticket.content} \n\n Reply: `}
            variant="outlined"
            onChange={handleChange}
          />
          <p className="ticket_email">
            <TextField
              id="outlined-multiline-static"
              label={<span className="edit-tag-span">Email to:</span>}
              multiline
              rows={1}
              defaultValue={`${ticket.userEmail}`}
              variant="outlined"
              onChange={handleChange}
            />
          </p>
          <p className="ticket_done">
            <div className={classes.selectDiv}>
              <InputLabel>
                {<span className="edit-tag-span">Done:</span>}
              </InputLabel>
              <Select onChange={handleChange} value={`${ticket.done}`}>
                <MenuItem value={10}>true</MenuItem>
                <MenuItem value={20}>false</MenuItem>
              </Select>
            </div>
          </p>
          <Button
            variant="contained"
            color="primary"
            className={classes.sendButton}
            onClick={() => {
              handleEditing(null, true);
            }}
          >
            Save and Send
          </Button>
        </div>
      )}
    </li>
  );
}
