import React, {useState}  from "react";
import Modal from "react-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons"
function ShoppingCart(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const deleteProduct = (id) =>{
    const productIndex = props.cart.findIndex(product => product._id === id)
    let cart = props.cart
    cart.splice(productIndex, 1)
    props.setCart([...cart])
  }

  const getTotalPrice = () =>{
    let result = 0;
    props.cart.forEach(product => {
      result += product.price
    });
    return result;
  }
  return (
    <div className="ShoppingCartContainer">
        <h1>CART</h1>
        {props.cart.map((product, index) =>(
        <div key={index} className="ShoppingProducts">
        <img src={"https://codeship-api.herokuapp.com/" + product.img_path}/>
          <div className="ShoppingProductsInfo">
            <h3>{product.title}</h3>
            <p>{product.price} coins</p>
          </div>
          <FontAwesomeIcon icon={faMinusCircle} onClick={()=> deleteProduct(product._id)} className="icon" />
        </div>
        ))}
        <div className="TotalProducts">
          <h3>Total:</h3>
          <p>&nbsp;{getTotalPrice()}  coins</p>
        </div>
        <div className="BuyButton">
          <button onClick={() => setModalIsOpen(true)}>BUY</button>
        </div>
        <Modal style={customStyles} className="modal" isOpen={modalIsOpen}>
            <span className="closeModal" onClick={() => setModalIsOpen(false)}>
              X
            </span>
            <div className="CoinsContainer">
              <div className="Coins">
              <img src="https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk"></img>
              <p>10 COINS</p>
              </div>
              <div className="Coins">
              <img src="https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk"></img>
              <p>50 COINS</p>
              </div>
              <div className="Coins">
              <img src="https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk"></img>
              <p>75 COINS</p>
              </div>
              <div className="Coins">
              <img src="https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk"></img>
              <p>100 COINS</p>
              </div>
              <div className="Coins">
              <img src="https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk"></img>
              <p>250 COINS</p>
              </div>
              <div className="Coins">
              <img src="https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk"></img>
              <p>500 COINS</p>
              </div>
            </div>
          </Modal>
    </div>
  );
}

export default ShoppingCart;