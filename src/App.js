import React, { useState, useEffect } from "react";
import CheckoutButton from "./CheckoutButtons";
import "./Checkout.css";
import Ticket from "./Ticket";

function App() {
  // hold ticket amount
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [adultShirtSize, setAdultShirtSize] = useState(null);
  const [childShirtSize, setChildShirtSize] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  // create function to add items to order
  const addToOrder = (ticketInfo) => {
    if (order === null) {
      setOrder([ticketInfo]);
    } else if (order !== null) {
      setOrder([...order, ticketInfo]);
    }
    setTotalPrice(totalPrice + ticketInfo.price);
  };

  useEffect(() => {
    console.log(order, totalPrice);
  }, [order]);

  return (
    <div className="">
      <h1>Bring Light to Baine's Legacy</h1>
      <p>
        Bring Light to Baine's Legacy is an annual event that is held in honor of Baine Brady Bobka
        who passed away in 2017 at the age of 7. He passed away from an unknown (at the time)
        genetic disorder called OTC Ornithine Transcarbamylase Deficiency. Since Baine's death,
        Baine's family has been able to track the disorder back to a specific ancestor, and have
        contacted all of their relatives to let them know about this disease. Because of Baine, many
        lives have been saved and doctors have learned so much more about this disorder. We created
        Bring Light to Baine's Legacy to honor Baine, as well as raise awareness about OTC
        Deficiency. This year we will also be honoring Rock Arthur Johnson who was less than one
        year old when he passed away in February from OTC Deficiency.
      </p>
      <h3>#baineslegacy #fightlikerock</h3>
      <h4>Date: July 10</h4>
      <h4>Location: Lewiston UT Fairgrounds (106 E Center St. Lewiston UT)</h4>
      <h4>Time:</h4>
      <ul>
        <li> -7 p.m. Registration</li>
        <li> -8 p.m. Run (1 mile run/walk, 5k run)</li>
        <li> -10 p.m. Fireworks</li>
      </ul>

      <h3>Wear everything glow in the dark to bring LIGHT to Baine's Legacy</h3>
      <h3>Standard Package Includes:</h3>
      <ul>
        <li>-Registration for run</li>
        <li>-Glow in the dark wristband</li>
        <li>-Glow sticks</li>
      </ul>
      <h3>Premium Package includes Standard Package plus Baine's Legacy T-shirt!</h3>

      <h2>Get Tickets</h2>
      <ul>
        <li>-Standard Child (0-12) - $5 </li>
        <button
          className="ticketAmount standardChildTicket"
          onClick={() => {
            addToOrder({ ticket: "Standard Child", price: 5 });
            console.log(order);
          }}>
          Add To Order
        </button>
        <li>-Standard Adult - $15 </li>
        <button
          className="ticketAmount standardAdultTicket"
          onClick={() => addToOrder({ ticket: "Standard Adult", price: 15 })}>
          Add To Order
        </button>
        <li>-Premium Child - $15 </li>
        <select onChange={(e) => setChildShirtSize(e.target.value)}>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
          <option>X-Large</option>
        </select>
        <button
          className="ticketAmount premiumChild"
          onClick={() =>
            addToOrder({ ticket: "Premium Child", price: 15, shirtSize: `${childShirtSize}` })
          }>
          Add to Order
        </button>

        <li>-Premium Adult- $25 </li>
        <select onChange={(e) => setAdultShirtSize(e.target.value)}>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
          <option>X-Large</option>
        </select>

        <button
          className="ticketAmount premiumAdult"
          onClick={() =>
            addToOrder({ ticket: "Premium Adult", price: 25, shirtSize: `${adultShirtSize}` })
          }>
          Add To Order
        </button>
      </ul>

      <form>
        <h1>Ticket info</h1>
        <input type="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
      </form>

      <CheckoutButton totalPrice={totalPrice} order={order} name={name} />

      {/* <Ticket /> */}
    </div>
  );
}

export default App;
