import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

// import components
import SelectProduct from "../components/SelectProduct";
import ProductCard from "../components/ProductCard";
import ShoppingCart from "../components/ShoppingCart";
import TopSpaceShip from "../components/TopSpaceShip";
import Header from "../components/Header";

import { Context } from '../components/Context'

function ShopContainer() {
  const context = useContext(Context)

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    loadProducts();
  }, []);

  const createPagination = (products, setProducts, setPagination) => {
    setProducts(products.slice(0, 6));
    let pages = products.length / 6;
    let start = 0;
    let end;
    let pagination = [];
    while (pages > 0) {
      pages--;
      end = start + 6;
      pagination.push(products.slice(start, end));
      start = end;
    }
    setPagination(pagination);
  };

  const loadProducts = (user) => {
    if (products.length > 0) {
      loadCart(user, products);
    } else {
      fetch(context.config.codeshipApi.urlBase + "/public/product", {
        method: "GET", cache: 'no-cache'
      })
        .then((res) => res.json())
        .then(({ products }) => {
          if (user) {
            loadCart(user, products);
          }
          setAllProducts([...products]);
          createPagination(products, setProducts, setPagination);
        });
    }
  };
  const loadCart = (user, items) => {
    const cartItems = [];
    user.cart.forEach((id) => {
      let index = -1;
      for (let i in items) {
        if (items[i]._id == id) {
          index = i;
          cartItems.push(items[index]);
          break;
        }
      }
    });
    setCart(cartItems);
  };
  const clickPaginationNext = () => {
    if (pagination.length - 1 > page) {
      setPage((previousState) => {
        const i = previousState + 1;
        setProducts(pagination[i]);
        return i;
      });
    }
  };
  const clickPaginationPrev = () => {
    if (0 < page) {
      setPage((previousState) => {
        const i = previousState - 1;
        setProducts(pagination[i]);
        return i;
      });
    }
  };

  useEffect(() => {
    if (context.session.cart) {
      loadProducts(context.session);
    }
  }, [context.session])

  return (
    <div className="Shop">
      <Header />
      <div className="ShopContainer">
        <div className="LeftContainer">
          <SelectProduct
            allProducts={allProducts}
            setProducts={setProducts}
            setPagination={setPagination}
            createPagination={createPagination}
          ></SelectProduct>
          <div className="ProductCardContainer">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                cart={cart}
                products={products}
                setCart={setCart}
              ></ProductCard>
            ))}
          </div>
          <div className="Pagination">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={clickPaginationPrev}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={clickPaginationNext}
            ></FontAwesomeIcon>
          </div>
        </div>
        <div className="RightContainer">
          <TopSpaceShip />
          {cart.length > 0 ? 
            <ShoppingCart cart={cart} setCart={setCart} allProducts={allProducts} /> : ''
          }
        </div>
      </div>
    </div>
  );
}

export default ShopContainer;
