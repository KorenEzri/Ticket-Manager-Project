import React from "react";
import "./Label.css";
export default function Label({ labels, filterTicketsByLabel }) {
  if (!labels) {
    return null;
  }
  return labels.map((label, index) => {
    return (
      <li
        key={`label-${index}`}
        className="label"
        onClick={(e) => {
          filterTicketsByLabel(label);
          const labelTarget = e.target;
          const ticket =
            e.target.parentElement.parentElement.parentElement.parentElement;
          ticket.classList.remove("bounceInRight");
          labelTarget.classList.add("flipInX");
          ticket.classList.add("bounceOutLeft");
          setTimeout(() => {
            labelTarget.classList.remove("flipInX");
            ticket.classList.add("bounceInRight");
            ticket.classList.remove("bounceOutLeft");
          }, 1000);
        }}
      >
        {label}
      </li>
    );
  });
}
