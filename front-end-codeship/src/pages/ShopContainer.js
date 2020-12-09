import React, {useState, useEffect} from "react";

// import components
import SelectProduct from "../components/SelectProduct";
import ProductCard from "../components/ProductCard";
import ShoppingCart from "../components/ShoppingCart";
import TopSpaceShip from "../components/TopSpaceShip";
// import ProductDetail from '../components/ProductDetail'

function ShopContainer() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("https://codeship-api.herokuapp.com/product", { method: "GET" })
      .then((res) => res.json())
      .then(({ data }) => {
        setProducts([...data.products]);
        setAllProducts([...data.products])
        //  console.log(products)
      });
  }, []);

  return (
    <div className="ShopContainer">
      <div className="LeftContainer">
        <SelectProduct allProducts={allProducts} setProducts={setProducts}></SelectProduct>
        <div className="ProductCardContainer">
          {products.map((product) => (
            <ProductCard product={product} cart={cart} products={products} setCart={setCart}></ProductCard>
          ))}
        </div>
      </div>
      <div className="RightContainer">
        <TopSpaceShip></TopSpaceShip>
        {cart.length > 0 ?  <ShoppingCart cart={cart} setCart={setCart}></ShoppingCart>: <div></div> }
      </div>
    </div>
  );
}
export default ShopContainer;
