import React, { useEffect, useRef } from "react";

export default function Paypal(props) {
  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Codeship Coins",
                amount: {
                  currency_code: "EUR",
                  value: props.coins,
                },
              },
            ],
          });
        },
        onApprove: async (data, action) => {
          const order = await action.order.capture();
          fetch("https://codeship-api.herokuapp.com/user", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": props.token,
            },
            body: JSON.stringify({
              points: props.coins + props.session.points,
            }),
          })
            .then((res) => res.json())
            .then(({ user }) => props.setSession(user));
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
