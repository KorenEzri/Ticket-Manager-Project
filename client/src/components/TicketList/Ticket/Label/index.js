import React from "react";

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
