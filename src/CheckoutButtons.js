import React from "react";

import ReactDOM from "react-dom";
import "./App.css";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function CheckoutButton(props) {
  const onApprove = (data, actions) => {
    fetch(
      `https://api.qrserver.com/v1/create-qr-code/?data=${props.order[0].ticket}&size=200x200`,
    ).then((response) => console.log(response));
    // .then((data) => console.log(data));
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
