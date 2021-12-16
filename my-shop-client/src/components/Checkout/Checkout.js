import { useEffect, useState } from "react";
import { getBraintreeClientToken } from "../../api/braintreeAPIs";
import { isAuthenticated } from "../../api/customerAPIs";
import { getCartItems } from "../Cart/cartHelpers";
import HomeLayout from "../Layout/HomeLayout";
import Cart from "./Cart";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = () => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken();
    setCartItems(getCartItems());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HomeLayout>
      <div className="container my-5">
        {data.clientToken !== null && cartItems.length > 0 ? (
          <div className="row d-flex justify-content-between flex-column-reverse flex-lg-row">
            <div className="col-lg-7 col-auto">
              <CheckoutForm
                data={data}
                cartItems={cartItems}
                userId={userId}
                token={token}
              />
            </div>
            <div className="col-lg-5 col-auto">
              <Cart />
            </div>
          </div>
        ) : (
          <div>NO ITEMS</div>
        )}
      </div>
    </HomeLayout>
  );
};

export default Checkout;
