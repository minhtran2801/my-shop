import React, { useState, useEffect } from "react";
import { getCartItems, removeItem } from "./cartHelpers";
import ItemCard from "./OffCanvas/ItemCard";

const OffCanvasCart = ({ isShown }) => {
  const [cartItems, setCartItems] = useState([]);

  const getSubTotal = () => {
    return cartItems.reduce((previousTotal, currentItem) => {
      return previousTotal + currentItem.purchase_quantity * currentItem.price;
    }, 0);
  };

  useEffect(() => {
    setCartItems(getCartItems());
  }, [isShown]);

  const handleRemove = (productId) => {
    removeItem(productId);
    setCartItems(getCartItems());
  };

  const handleQuantity = () => {
    setCartItems(getCartItems());
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasCart"
      aria-labelledby="offcanvasCartLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasCartLabel">
          Your Cart
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {cartItems.length > 0 ? (
          <div className="container">
            {cartItems.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                handleRemove={handleRemove}
                handleQuantity={handleQuantity}
              />
            ))}
            <hr />
            <div className="row">
              <div className="col-6">
                <h5 className="mb-0">Total</h5>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <b>${getSubTotal()}</b>
              </div>
            </div>
            <div className="mt-3">
              <button type="button" className="btn btn-dark w-100">
                CHECKOUT
              </button>
            </div>
          </div>
        ) : (
          <div>Your cart is empty.</div>
        )}
      </div>
    </div>
  );
};

export default OffCanvasCart;
