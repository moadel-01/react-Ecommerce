import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { BanknotesIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import "./Cart.css";

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
    setShowModal(true);
    localStorage.setItem("order", JSON.stringify(order));
    // setTimeout(() => {
    //   setCart([]);
    // localStorage.removeItem("cart");
    // }, 500);
  };

  const increaseQty = (_id) => {
    const updatedCart = cart.map((item) =>
      item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQty = (_id) => {
    const updatedCart = cart.map((item) =>
      item._id === _id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
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
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 z-10">
            <div className="flex flex-col items-center text-center">
              <ShoppingCartIcon className="w-18 h-18 text-indigo-500 mb-4 bg-indigo-100 rounded-full p-4" />
              <Dialog.Title className="text-base font-semibold">
                Great choice! Your products is now in the cart
              </Dialog.Title>
              <p className="mt-2 text-sm text-gray-600">
                Ready to complete your order?
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className="mt-6 inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500 cursor-pointer"
                  onClick={() => {
                    setShowModal(false);
                    navigate("/checkOut");
                  }}
                >
                  Checkout
                </button>
                <button
                  className="mt-6 inline-flex justify-center rounded-md bg-rose-600 px-4 py-2 text-sm text-white hover:bg-rose-500 cursor-pointer"
                  onClick={() => {
                    setShowModal(false);
                    navigate("/");
                  }}
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Cart;
