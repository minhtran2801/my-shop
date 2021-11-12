import { useEffect, useState } from "react";
import { getBraintreeClientToken } from "../../api/braintreeAPIs";
import { isAuthenticated } from "../../api/customerAPIs";
import HomeLayout from "../Layout/HomeLayout";
import DropIn from "braintree-web-drop-in-react";
import { getCartItems } from "../Cart/cartHelpers";

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
        setData({ ...data, clientToken: data.clientToken, success: true });
      }
    });
  };

  useEffect(() => {
    getToken();
    setCartItems(getCartItems());
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(cartItems);
  }, [data, cartItems]);

  const ShowDropIn = () => (
    <div>
      {data.clientToken !== null && cartItems.length > 0 ? (
        <div>
          <DropIn
            options={{ authorization: data.clientToken }}
            onInstance={(instance) => (data.instance = instance)}
          />

          <button className="btn btn-success">CHECKOUT</button>
        </div>
      ) : (
        <div>NO ITEMs</div>
      )}
    </div>
  );

  return (
    <HomeLayout>
      <ShowDropIn />
    </HomeLayout>
  );
};

export default Checkout;
