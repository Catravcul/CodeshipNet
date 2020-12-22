import React, { useState } from "react";
import ModalProduct from "./ModalProduct";
import { getSpaceshipConfig } from "../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
const config = getSpaceshipConfig();

// install npm font awesome
//npm i --save @fortawesome/fontawesome-svg-core  @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons
function ProductCard(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const addProduct = (id) => {
    if (props.cart.find((product) => product._id === id)) {
    } else {
      const product = props.products.find((product) => product._id === id);
      props.setCart((prevState) => [...prevState, product]);
    }
  };

  return (
    <div className="ProductCard">
      <img
        onClick={() => setModalIsOpen(true)}
        src={"https://codeship-api.herokuapp.com/" + props.product.img_path}
      />
      <div className="ContainerInfoCard">
        <h3> {props.product.title} </h3>
        <p>
          {props.product.price}
          coins
        </p>
        {props.session ? (
          <FontAwesomeIcon
            icon={faPlusCircle}
            onClick={() => addProduct(props.product._id)}
            className="icon"
          />
        ) : (
          <span></span>
        )}
      </div>
      <ModalProduct
        token={props.token}
        product={props.product}
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
      ></ModalProduct>
    </div>
  );
}

export default ProductCard;
