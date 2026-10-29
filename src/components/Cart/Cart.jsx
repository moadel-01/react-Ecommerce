import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  BanknotesIcon,
  ExclamationTriangleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import "./Cart.css";
import { jwtDecode } from "jwt-decode";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (_id) => {
    const updatedCart = cart.filter((item) => item._id !== _id);
    updateCart(updatedCart);
  };

  const handleCheckout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return setShowModal(true);
    }

    if (token) {
      const tokenData = jwtDecode(token);
      const remainingTime = tokenData.exp * 1000 - Date.now();

      if (remainingTime <= 0) {
        return setShowModal(true);
      }
    }

    localStorage.setItem("order", JSON.stringify(order));
    navigate("/checkOut");
  };

  const increaseQty = (_id) => {
    const updatedCart = cart.map((item) =>
      item._id === _id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    updateCart(updatedCart);
  };

  const decreaseQty = (_id) => {
    const updatedCart = cart.map((item) =>
      item._id === _id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
    updateCart(updatedCart);
  };

  const totalPrice = cart
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  const order = {
    products: cart,
    totalPrice: totalPrice,
  };

  return (
    <div className="cart-page">
      {cart.length === 0 && !showModal ? (
        <div className="emptyCartCont">
          <h2 className="emptyCart">Your Cart is Empty</h2>
          <Link to="/">
            <button className="goShop">Go Shopping</button>
          </Link>
        </div>
      ) : (
        <>
          <h2 className="urCart">Your Cart</h2>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cartImg">
                <img src={item.thumbnail} className="cart-img" />
              </div>
              <div className="cart-details">
                <h3 className="cartPrdcTitle">{item.title}</h3>
                <p className="cartPrdcdisc">{item.description}</p>
                <div className="quantity-controls">
                  <button
                    className="quanBtn"
                    onClick={() => decreaseQty(item._id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="quanBtn"
                    onClick={() => increaseQty(item._id)}
                  >
                    +
                  </button>
                </div>
                <p>Price: ${item.price.toFixed(2)}</p>
                <button
                  className="removebtn"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${totalPrice}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      <Transition show={showModal}>
        <Dialog
          onClose={() => setShowModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-5 z-10">
            <div className="flex flex-col gap-5 items-center text-center">
              <ExclamationTriangleIcon className="w-18 h-18 text-indigo-500 mb- bg-indigo-100 rounded-full p-4" />
              <div>
                <Dialog.Title className="text-base font-semibold">
                  You have to log in to proceed to checkout!
                </Dialog.Title>
                <p className="text-sm text-gray-600">
                  Log in then return to your cart page.
                </p>
              </div>
              <div className="grid gap-2">
                <button
                  className="inline-flex justify-center rounded-md bg-indigo-500 px-4 py-1.5 text-base font-medium text-white hover:bg-indigo-500 cursor-pointer"
                  onClick={() => {
                    setShowModal(false);
                    navigate("/SignIn");
                  }}
                >
                  Log In
                </button>
                <p className="text-center text-sm/6 text-gray-500">
                  Not a member?{" "}
                  <Link
                    to={"/SignUp"}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 transition duration-300"
                  >
                    Join Us Now!!
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Cart;
