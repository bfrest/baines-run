import React from "react";
import "./Ticket.css";

const Ticket = () => {
  return (
    <div className="ticket">
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ticket info goes here.......hi bailey 👋 " />
      <p>#baineslegacy #fightlikerock</p>
      <div>
        <p>Brendon Freston</p>
      </div>

      <div>
        <p>Type: Adult</p>
      </div>

      <div>
        <p>Shirt Size: Large</p>
      </div>

      {/* if premium show shirt size */}
    </div>
  );
};

export default Ticket;
