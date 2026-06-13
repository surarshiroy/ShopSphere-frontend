import React, { useContext, useState, useEffect } from "react";

import AppContext from "../context/Context";

import axios from "axios";

import CheckoutPopup from "./CheckOutPopup.jsx";

import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import CustomToast
from "./CustomToast";



const Cart = () => {
  const navigate = useNavigate();
  const [toastShow, setToastShow] =
  useState(false);

const [toastMessage, setToastMessage] =
  useState("");

const [toastType, setToastType] =
  useState("success");

  const { cart, removeFromCart , clearCart } = useContext(AppContext);
  console.log("CART STATE:", cart);

  const [cartItems, setCartItems] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [cartImage, setCartImage] = useState([]);

  const [showModal, setShowModal] = useState(false);



  useEffect(() => {

    const fetchImagesAndUpdateCart = async () => {

      console.log("Cart", cart);

      try {

        const response = await axios.get("https://shopsphere-backend-v2.onrender.com/api/products");

        const backendProductIds = response.data.content.map((product) => product.id);



        const updatedCartItems = cart.filter((item) => backendProductIds.includes(item.id));

        const cartItemsWithImages = await Promise.all(

          updatedCartItems.map(async (item) => {

            try {

              const response = await axios.get(

                `https://shopsphere-backend-v2.onrender.com/api/product/${item.id}/image`,

                { responseType: "blob" }

              );

              const imageFile = await converUrlToFile(response.data, response.data.imageName);

              setCartImage(imageFile)

              const imageUrl = URL.createObjectURL(response.data);

              return { ...item, imageUrl };

            } catch (error) {

              console.error("Error fetching image:", error);

              return { ...item, imageUrl: "placeholder-image-url" };

            }

          })

        );

        console.log("cart", cart);
console.log(
  "UPDATED CART ITEMS:",
  cartItemsWithImages
);

setCartItems(cartItemsWithImages);

      } catch (error) {

        console.error("Error fetching product data:", error);

      }

    };



    if (cart.length) {

      fetchImagesAndUpdateCart();

    }

  }, [cart]);



  useEffect(() => {

    const total = cartItems.reduce(

      (acc, item) => acc + item.price * item.quantity,

      0

    );

    setTotalPrice(total);

  }, [cartItems]);



  const converUrlToFile = async (blobData, fileName) => {

    const file = new File([blobData], fileName, { type: blobData.type });

    return file;

  }



  const handleIncreaseQuantity = (itemId) => {

    const newCartItems = cartItems.map((item) => {

      if (item.id === itemId) {

        if (item.quantity < item.stockQuantity) {

          return { ...item, quantity: item.quantity + 1 };

        } else {

          alert("Cannot add more than available stock");

        }

      }

      return item;

    });

    setCartItems(newCartItems);

  };

 



  const handleDecreaseQuantity = (itemId) => {

    const newCartItems = cartItems.map((item) =>

      item.id === itemId

        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }

        : item

    );

    setCartItems(newCartItems);

  };



  const handleRemoveFromCart = (itemId) => {

    removeFromCart(itemId);

    const newCartItems = cartItems.filter((item) => item.id !== itemId);

    setCartItems(newCartItems);

  };

  const handleRazorpayCheckout = async () => {

  try {

   const token = localStorage.getItem("token");
  
console.log("TOKEN =", token);

const response = await axios.post(
  "https://shopsphere-backend-v2.onrender.com/api/payment/create-order",
  {
    amount: totalPrice
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

    const order = response.data;

    console.log("ORDER =", order);

    const options = {

  key: import.meta.env.VITE_RAZORPAY_KEY_ID,

  amount: order.amount,

  currency: order.currency,

  name: "ShopSphere",

  description: "Purchase",

  order_id: order.id,

  handler: async function(response) {

    try {

        await axios.post(
          "https://shopsphere-backend-v2.onrender.com/api/checkout",
          {
            items: cartItems.map(item => ({
              productId: item.id,
              quantity: item.quantity
            }))
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        clearCart();
        setCartItems([]);

        setToastMessage("Payment Successful");
        setToastType("success");
        setToastShow(true);

    } catch(error) {

        console.error(error);

        setToastMessage(
          "Payment succeeded but checkout failed"
        );

        setToastType("danger");
        setToastShow(true);

    } finally {

        setShowModal(false);   // ALWAYS CLOSE MODAL
    }
}
};

const razorpay =
  new window.Razorpay(options);

razorpay.open();

  } catch (error) {

    console.error(error);

  }
};



  const handleCheckout = async () => {

  const token = localStorage.getItem("token");

if (!token) {

  setShowModal(false);

  setToastMessage(
    "Please login before checkout"
  );

  setToastType("danger");

  setToastShow(true);

  setTimeout(() => {
    navigate("/login");
  }, 2000);

  return;
}

  try {

    await axios.post(
      "https://shopsphere-backend-v2.onrender.com/api/checkout",
      {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setToastMessage(
  "Purchase successful"
);

setToastType("success");

setToastShow(true);

    clearCart();
    setCartItems([]);
    setShowModal(false);

  } catch (error) {

    console.error("Checkout failed:", error);

    setToastMessage(
  "Checkout failed"
);

setToastType("danger");

setToastShow(true);

  }

};



  return (

    <div className="cart-container">

      <div className="shopping-cart">

        <div className="title">Shopping Bag</div>

        {cartItems.length === 0 ? (

          <div className="empty" style={{ textAlign: "left", padding: "2rem" }}>

            <h4>Your cart is empty</h4>

          </div>

        ) : (

          <>

            {cartItems.map((item) => (

              <li key={item.id} className="cart-item">

                <div

                  className="item"

                  style={{ display: "flex", alignItems: "center" }}

                  key={item.id}

                >

                  <div className="buttons">

                    <div className="buttons-liked">

                      <i className="bi bi-heart"></i>

                    </div>

                  </div>

                  <div>

                    <img

                      src={item.imageUrl}

                      alt={item.name}

                      className="cart-item-image"

                    />

                  </div>

                  <div className="description">

                    <span>{item.brand}</span>

                    <span>{item.name}</span>

                  </div>



                  <div className="quantity">

                    <button

                      className="plus-btn"

                      type="button"

                      name="button"

                      onClick={() => handleIncreaseQuantity(item.id)}

                    >

                      <i className="bi bi-plus-square-fill"></i>

                    </button>

                    <input

                      type="button"

                      name="name"

                      value={item.quantity}

                      readOnly

                    />

                    <button

                      className="minus-btn"

                      type="button"

                      name="button"

                      onClick={() => handleDecreaseQuantity(item.id)}

                    >

                      <i className="bi bi-dash-square-fill"></i>

                    </button>

                  </div>



                  <div className="total-price " style={{ textAlign: "center" }}>

                     ₹{item.price * item.quantity}

                  </div>

                  <button

                    className="remove-btn"

                    onClick={() => handleRemoveFromCart(item.id)}

                  >

                    <i className="bi bi-trash3-fill"></i>

                  </button>

                </div>

              </li>

            ))}

            <div className="total">Total:  ₹{totalPrice}</div>

            <Button

              className="btn btn-primary"

              style={{ width: "100%" }}
           

              onClick={() => setShowModal(true)}

            >

              Checkout

            </Button>

          </>

        )}

      </div>
      <CustomToast
  show={toastShow}
  setShow={setToastShow}
  message={toastMessage}
  bg={toastType}
/>

      <CheckoutPopup

        show={showModal}

        handleClose={() => setShowModal(false)}

        cartItems={cartItems}

        totalPrice={totalPrice}

        handleCheckout={handleRazorpayCheckout}

      />

    </div>

  );

};



export default Cart;