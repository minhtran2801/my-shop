import React, { useState, useEffect } from "react";
import { getCartItems } from "../Cart/cartHelpers";
import ItemCard from "../Cart/OffCanvas/ItemCard";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const getSubTotal = () => {
    return cartItems.reduce((previousTotal, currentItem) => {
      return previousTotal + currentItem.purchase_quantity * currentItem.price;
    }, 0);
  };

  useEffect(() => {
    setCartItems(getCartItems());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h3 className="card-title text-center">Order Summary</h3>
        <div className="card-text">
          <hr />
        </div>
        {cartItems.map((item, index) => (
          <ItemCard key={index} item={item} isCheckingOut={true} />
        ))}
        <hr />
        <div className="d-flex justify-content-end">
          <h5>Total: ${getSubTotal()}</h5>
        </div>
      </div>
    </div>
  );
};

export default Cart;
