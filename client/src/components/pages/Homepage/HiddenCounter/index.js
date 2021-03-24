import React from "react";

export default function HiddenCounter({ hiddenCount, restoreAll }) {
  return (
    <div>
      <div id="hideTicketsCounter">{hiddenCount}</div>
      <button
        id="restoreHideTickets"
        onClick={async () => {
          await restoreAll();
        }}
      >
        Restore tickets
      </button>
    </div>
  );
}
