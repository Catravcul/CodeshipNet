import React from "react";

function SelectProduct(props) {
  const category = (e) => {
    switch (e.currentTarget.value) {
      case "PROPULSION ENGINE":
        let propulsion = [];
        props.allProducts.forEach((product) => {
          if (product.type === "propulsionEngine") {
            propulsion.push(product);
          }
        });
        props.createPagination(
          propulsion,
          props.setProducts,
          props.setPagination
        );
        break;
      case "FUSELAGE":
        let fuselage = [];
        props.allProducts.forEach((product) => {
          if (product.type === "fuselage") {
            fuselage.push(product);
          }
        });
        props.createPagination(
          fuselage,
          props.setProducts,
          props.setPagination
        );
        break;
      case "TAKE-OFF":
        let takeoff = [];
        props.allProducts.forEach((product) => {
          if (product.type === "takeoff") {
            takeoff.push(product);
          }
        });
        props.createPagination(takeoff, props.setProducts, props.setPagination);
        break;
      default:
        props.createPagination(
          props.allProducts,
          props.setProducts,
          props.setPagination
        );
        break;
    }
  };
  return (
    <div className="SelectProduct">
      <select onClick={category}>
        <option>CATEGORY</option>
        <option>PROPULSION ENGINE</option>
        <option>FUSELAGE</option>
        <option>TAKE-OFF</option>
      </select>
    </div>
  );
}

export default SelectProduct;
