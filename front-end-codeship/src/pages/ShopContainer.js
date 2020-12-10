import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

// import components
import SelectProduct from "../components/SelectProduct";
import ProductCard from "../components/ProductCard";
import ShoppingCart from "../components/ShoppingCart";
import TopSpaceShip from "../components/TopSpaceShip";
import Header from '../components/Header'

function ShopContainer() {
  const [products, setProducts] = useState([{},{},{}]);
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [pagination, setPagination] = useState([])
  useEffect(() => {
    fetch("https://codeship-api.herokuapp.com/product", { method: "GET" })
      .then((res) => res.json())
      .then(({ data }) => {
        setProducts(data.products.slice(0,6));
        setAllProducts([...data.products])
        //  console.log(products)
        let pages = data.products.length / 6
        let start = 0
        let end
        while(pages > 0){
          pages--
          end = start + 6
          pagination.push(data.products.slice(start, end))
          start=end
        }
        setPagination(pagination)
        console.log(pagination)
      });
  }, []);
  return (
    <div className="Shop">
      <Header></Header>
    <div className="ShopContainer">
      <div className="LeftContainer">
        <SelectProduct allProducts={allProducts} setProducts={setProducts}></SelectProduct>
        <div className="ProductCardContainer">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} cart={cart} products={products} setCart={setCart}></ProductCard>
          ))}
        </div>
        <div className="Pagination">
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
        </div>
      </div>
      <div className="RightContainer">
        <TopSpaceShip></TopSpaceShip>
        {cart.length > 0 ?  <ShoppingCart cart={cart} setCart={setCart}></ShoppingCart>: <div></div> }
      </div>
    </div>
    </div>
  );
}
export default ShopContainer;
