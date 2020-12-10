import React from "react";

function SelectProduct(props) {
  const category = (e) => {
    switch(e.currentTarget.textContent){
      case 'PROPULSION ENGINE':
        let propulsion = []
        props.allProducts.forEach( product => {
          if(product.type === 'Propulsion Engine'){
            propulsion.push(product)
          }
        });
        props.setProducts(propulsion)
      break;
      case 'FUSELAGE':
        let fuselage = []
        props.allProducts.forEach( product => {
          if(product.type === 'Fuselage'){
            fuselage.push(product)
          }
        });
        props.setProducts(fuselage)
      break;
      case 'TAKE-OFF':
        let takeoff = []
        props.allProducts.forEach( product => {
          if(product.type === 'Takeoff'){
            takeoff.push(product)
          }
        });
        props.setProducts(takeoff)
        break;
        default:
          props.setProducts(props.allProducts)
        break;
    }
  }
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