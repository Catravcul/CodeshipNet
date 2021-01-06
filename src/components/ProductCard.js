import React, { useState, useContext } from "react";
import ModalProduct from "./ModalProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Context } from "./Context";

// install npm font awesome
//npm i --save @fortawesome/fontawesome-svg-core  @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons
function ProductCard(props) {
  const context = useContext(Context);
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
        src={context.config.codeshipFS.urlBase + props.product.img_path}
      />
      <div className="ContainerInfoCard">
        <h3> {props.product.title} </h3>
        <p>
          {props.product.price}
          &nbsp; coins
        </p>
        {context.session.cart ? (
          <FontAwesomeIcon
            icon={faPlusCircle}
            onClick={() => {
              if (
                context.session.items.findIndex(
                  (id) => id === props.product._id
                ) === -1 &&
                props.cart.findIndex(
                  (item) => item._id === props.product._id
                ) === -1
              ) {
                addProduct(props.product._id);
              }
            }}
            className="icon"
          />
        ) : (
          <span></span>
        )}
      </div>
      <ModalProduct
        token={context.token}
        product={props.product}
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
      ></ModalProduct>
    </div>
  );
}

export default ProductCard;
