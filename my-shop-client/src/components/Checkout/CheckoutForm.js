import React, { useState } from "react";
import { processPayment } from "../../api/braintreeAPIs";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "../Cart/cartHelpers";
import { useHistory } from "react-router-dom";

const CheckoutForm = ({ userId, token, data, cartItems }) => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  const getSubTotal = () => {
    return cartItems.reduce((previousTotal, currentItem) => {
      return previousTotal + currentItem.purchase_quantity * currentItem.price;
    }, 0);
  };

  const handlePurchase = () => {
    let nonce;
    setLoading(true);
    data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodData: nonce,
          amount: getSubTotal(),
        };

        processPayment(userId, token, paymentData)
          .then((res) => {
            // Empty cart
            emptyCart(() => {
              setLoading(false);
              history.push("/checkout/success");
            });
            // Create order
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log("dropin error: ", error);
        setLoading(false);
      });
  };

  const showLoading = () => {
    let overlay = document.getElementsByClassName("loading-overlay")[0];
    overlay.classList.toggle("is-active");
  };

  return (
    <div>
      {loading && showLoading()}
      <div className="loading-overlay">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading ....</span>
        </div>
        <div>
          <p className="loading-text">Processing your payment</p>
        </div>
      </div>
      <h3>Customer Information</h3>
      <div>
        <DropIn
          options={{
            authorization: data.clientToken,
            paypal: { flow: "vault" },
          }}
          onInstance={(instance) => (data.instance = instance)}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-success" onClick={handlePurchase}>
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
