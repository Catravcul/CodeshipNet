import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import { Context } from "./Context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import Paypal from "./Paypal";
// import images
import coin1 from "../assets/coin1-02.png";
import coin2 from "../assets/coin2-02.png";
import coin3 from "../assets/coin3-02.png";
import coin4 from "../assets/coin4-02.png";
import coin5 from "../assets/coin5-02.png";
import coin6 from "../assets/coin6-02.png";
function ShoppingCart(props) {
  const context = useContext(Context);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [coins, setCoins] = useState(0);
  let totalPrice = 0;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "none",
      backgroundColor: "black",
      border: "none",
      inset: "10% auto auto 50%",
    },
  };
  const getCartIds = () => {
    return props.cart.map((item) => item._id);
  };
  const deleteProduct = (id) => {
    const productIndex = props.cart.findIndex((product) => product._id === id);
    let cart = props.cart;
    cart.splice(productIndex, 1);
    props.setCart([...cart]);
    if (cart.length === 0) {
      fetch(context.config.codeshipApi.urlBase + "/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": context.token,
        },
        body: JSON.stringify({ cart: [] }),
      })
        .then((res) => res.json())
        .then((data) => {
          sessionStorage.setItem("codeship-session", JSON.stringify(data.user));
          context.setSession(data.user);
        });
    }
  };

  const getTotalPrice = () => {
    let result = 0;
    props.cart.forEach((product) => {
      result += product.price;
    });
    totalPrice = result;
    return result;
  };

  const saveCart = () => {
    const itemsID = props.cart.map((item) => item._id);
    const body = { cart: itemsID };
    fetch(context.config.codeshipApi.urlBase + "/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": context.token,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem("codeship-session", JSON.stringify(data.user));
        context.setSession(data.user);
      });
  };

  return (
    <div className="ShoppingCartContainer">
      <h1>CART</h1>
      {props.cart.map((product, index) => (
        <div key={index} className="ShoppingProducts">
          <img
            src={context.config.codeshipFS.urlBase + product.img_path}
          />
          <div className="ShoppingProductsInfo">
            <h3>{product.title}</h3>
            <p>{product.price} coins</p>
          </div>
          <FontAwesomeIcon
            icon={faMinusCircle}
            onClick={() => deleteProduct(product._id)}
            className="icon"
          />
        </div>
      ))}
      <div className="TotalProducts">
        <h3>Total:</h3>
        <p>&nbsp;{getTotalPrice()} coins</p>
      </div>
      <div className="ButtonsShop">
        <div className="SaveButton">
          <button onClick={saveCart}>SAVE CART</button>
        </div>
        <div className="BuyButton">
          {/* <button onClick={() => setModalIsOpen(true)}>BUY</button> */}

          <button
            onClick={() => {
              if (totalPrice > context.session.points) {
                setModalIsOpen(true);
              } else {
                fetch(context.config.codeshipApi.urlBase + "/user", {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    "x-access-token": context.token,
                  },
                  body: JSON.stringify({
                    points: context.session.points - totalPrice,
                    cart: [],
                    items: context.session.items.concat(getCartIds()),
                  }),
                })
                  .then((res) => res.json())
                  .then(({ user }) => {
                    context.setSession(user);
                    props.setCart([]);
                  });
              }
            }}
          >
            BUY
          </button>
        </div>
      </div>
      <Modal style={customStyles} className="modal" isOpen={modalIsOpen}>
        <span className="closeModal" onClick={() => setModalIsOpen(false)}>
          X
        </span>
        {checkout ? (
          <>
            <span className="closeModal" onClick={() => setModalIsOpen(false)}>
              X
            </span>
            <p onClick={() => setCheckout(false)}>BACK</p>
            <Paypal coins={coins} />
          </>
        ) : (
          <div className="CoinsContainer">
            <div
              onClick={() => {
                setCheckout(true);
                setCoins(10);
              }}
              className="Coins"
            >
              <img src={coin1}></img>
              <p data-coins="10">10 COINS</p>
            </div>
            <div
              onClick={() => {
                setCheckout(true);
                setCoins(50);
              }}
              className="Coins"
            >
              <img src={coin2}></img>
              <p data-coins="50">50 COINS</p>
            </div>
            <div
              onClick={() => {
                setCheckout(true);
                setCoins(75);
              }}
              className="Coins"
            >
              <img src={coin3}></img>
              <p data-coins="75">75 COINS</p>
            </div>
            <div
              onClick={() => {
                setCheckout(true);
                setCoins(100);
              }}
              className="Coins"
            >
              <img src={coin4}></img>
              <p data-coins="100">100 COINS</p>
            </div>
            <div
              onClick={() => {
                setCheckout(true);
                setCoins(250);
              }}
              className="Coins"
            >
              <img src={coin5}></img>
              <p data-coins="250">250 COINS</p>
            </div>
            <div
              onClick={() => {
                setCheckout(true);
                setCoins(500);
              }}
              className="Coins"
            >
              <img src={coin6}></img>
              <p data-coins="500">500 COINS</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ShoppingCart;
