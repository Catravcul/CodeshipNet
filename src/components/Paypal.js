import React, { useEffect, useRef, useContext } from "react";
import { Context } from './Context'

export default function Paypal(props) {
  const context = useContext(Context)

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
          fetch(context.config.codeshipApi.urlBase + "/user", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": context.token,
            },
            body: JSON.stringify({
              points: props.coins + context.session.points,
            }),
          })
            .then((res) => res.json())
            .then(({ user }) => context.setSession(user));
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
