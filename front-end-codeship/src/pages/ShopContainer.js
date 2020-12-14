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
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState(0)
  const createPagination = (products, setProducts, setPagination) => {
    setProducts(products.slice(0,6));
    let pages = products.length / 6
    let start = 0
    let end
    let pagination = []
    while(pages > 0){
      pages--
      end = start + 6
      pagination.push(products.slice(start, end))
      start=end
    }
    setPagination(pagination)
  }
  useEffect(() => {
    fetch("https://codeship-api.herokuapp.com/public/product", { method: "GET" })
      .then((res) => res.json())
      .then(({ data }) => {
        setAllProducts([...data.products])
        createPagination(data.products, setProducts, setPagination)
      })
  }, []);
  const clickPaginationNext = () => {
    if(pagination.length - 1 > page){
      setPage(previousState => {
        const i = previousState + 1
        setProducts(pagination[i])
        return i
      })
    }
  }
  const clickPaginationPrev = () => {
    if(0 < page){
      setPage(previousState => {
        const i = previousState - 1
        setProducts(pagination[i])
        return i
      })
    }
  }
  return (
    <div className="Shop">
      <Header></Header>
    <div className="ShopContainer">
      <div className="LeftContainer">
        <SelectProduct allProducts={allProducts} setProducts={setProducts} setPagination={setPagination} createPagination={createPagination}></SelectProduct>
        <div className="ProductCardContainer">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} cart={cart} products={products} setCart={setCart}></ProductCard>
          ))}
        </div>
        <div className="Pagination">
            <FontAwesomeIcon icon={faChevronLeft} onClick={clickPaginationPrev}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faChevronRight} onClick={clickPaginationNext}></FontAwesomeIcon>
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
