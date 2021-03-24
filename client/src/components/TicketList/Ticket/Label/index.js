import React from "react";

export default function Label({ labels }) {
  if (labels) {
    return labels.map((label) => {
      return <li className="label">{label}</li>;
    });
  } else return null;
}
