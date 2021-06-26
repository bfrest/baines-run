import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import ReactDOM from "react-dom";
import "./App.css";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function CheckoutButton(props) {
  const [ticketString, setTicketString] = useState(null);

  const parseOrder = (order) => {
    let ticketInfo;

    order.map((item) => {
      // First run through, add first item
      if (!ticketInfo) {
        // if its premium, get shirt size with ticket
        if (item.shirtSize) {
          ticketInfo = `${item.ticket}: ${item.shirtSize}`;
        } else {
          // add non premium ticket
          ticketInfo = `${item.ticket}`;
        }
      } else {
        // after the first item is added, add the rest
        if (item.shirtSize) {
          // Premium tickets with shirt size
          ticketInfo = ticketInfo + `, ${item.ticket} ${item.shirtSize}`;
        } else {
          ticketInfo = ticketInfo + `, ${item.ticket}`;
        }
      }
      return ticketInfo;
    });
    setTicketString(ticketInfo);
  };

  const sendMail = function () {
    const templateParams = {
      name: "jackie",
      send_to: "frestonb@gmail.com",
      from_name: "Jordan",
    };

    emailjs.sendForm("default_service", "template_vjg4l6k", templateParams).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      },
    );
  };

  // stops the error of no order before creating it
  useEffect(() => props.order && parseOrder(props.order), []);

  const onApprove = (data, actions) => {
    // Make firbase call to hold name, email, link to qr code
    fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${ticketString}&size=200x200`).then(
      (response) => console.log(response.url),
    );
    // .then((data) => console.log(data));
    sendMail();
    return actions.order.capture();
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: props.totalPrice,
          },
        },
      ],
    });
  };

  return (
    <div className="btns">
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </div>
  );
}

export default CheckoutButton;
