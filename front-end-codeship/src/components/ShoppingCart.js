import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons"
function ShoppingCart(props) {

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
        {props.cart.map((product) =>(
        <div className="ShoppingProducts">
        <img src={"https://codeship-api.herokuapp.com/" + product.img_path}/>
          <div className="ShoppingProductsInfo">
            <h3>{product.title}</h3>
            <p>{product.price} points</p>
          </div>
          <FontAwesomeIcon icon={faMinusCircle} onClick={()=> deleteProduct(product._id)} className="icon" />
        </div>
        ))}
        <div className="TotalProducts">
          <h3>Total:</h3>
          <p>&nbsp;{getTotalPrice()}  points</p>
        </div>
        <div className="BuyButton">
          <button>BUY</button>
        </div>
    </div>
  );
}

export default ShoppingCart;