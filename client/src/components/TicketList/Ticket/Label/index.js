import React from "react";
import "./Label.css";
export default function Label({ labels }) {
  if (labels) {
    return labels.map((label, index) => {
      return (
        <li key={`label-${index}`} className="label">
          {label}
        </li>
      );
    });
  } else return null;
}
