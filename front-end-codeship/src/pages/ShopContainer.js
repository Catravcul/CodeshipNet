import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

// import components
import SelectProduct from "../components/SelectProduct";
import ProductCard from "../components/ProductCard";
import ShoppingCart from "../components/ShoppingCart";
import TopSpaceShip from "../components/TopSpaceShip";
import Header from "../components/Header";

function ShopContainer(props) {
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
      fetch("https://codeship-api.herokuapp.com/public/product", {
        method: "GET",
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

  if (props.token && !props.session.cart) {
    fetch("https://codeship-api.herokuapp.com/user", {
      method: "GET",
      headers: { "x-access-token": props.token },
    })
      .then((res) => res.json())
      .then(({ user }) => {
        loadProducts(user);
        props.setSession(user);
      });
  }

  return (
    <div className="Shop">
      <Header
        setSession={props.setSession}
        setToken={props.setToken}
        session={props.session}
      />
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
                token={props.token}
                session={props.session}
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
          <TopSpaceShip></TopSpaceShip>
          {cart.length > 0 ? (
            <ShoppingCart
              session={props.session}
              token={props.token}
              cart={cart}
              setCart={setCart}
              allProducts={allProducts}
              setSession={props.setSession}
            ></ShoppingCart>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopContainer;
