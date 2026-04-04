import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import "./CheckOut.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api/axios";
function CheckOut() {
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const orderData = localStorage.getItem("order");
  const order = JSON.parse(orderData);
  const navigate = useNavigate();

  const products = order.products.map((item) => ({
    prod_id: item._id,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    thumbnail: item.thumbnail,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalOrder = {
      cartProducts: products,
      totalPrice: Number(order.totalPrice),
    };

    console.log(finalOrder);

    api
      .post(
        "https://express-ecommerce-kappa.vercel.app/order",
        finalOrder,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res);
        setError("");
        setShowModal(true);
      })
      .catch((res) => {
        console.log(res);
        setError(res.response.data.message);
        setShowModal(false);
      });

    setError("");
    setShowModal(true);
  };

  const cartProducts = JSON.parse(localStorage.getItem("cart"));
  cartProducts.map((el) => {});

  const totalPrice = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="checkoutCont">
      <div className="checkoutForm">
        <form onSubmit={handleSubmit}>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Contact & Shipping Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    id="full-name"
                    name="full-name"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="Email"
                    name="Email"
                    type="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="card"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Card number
                </label>
                <div className="mt-2">
                  <input
                    id="card"
                    name="card"
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="Exp"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Expiration date
                </label>
                <div className="mt-2">
                  <input
                    id="Exp"
                    name="Exp"
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="CVC"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  CVC
                </label>
                <div className="mt-2">
                  <input
                    id="CVC"
                    name="CVC"
                    type="number"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    id="street-address"
                    name="street-address"
                    type="text"
                    autoComplete="street-address"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    id="region"
                    name="region"
                    type="text"
                    autoComplete="address-level1"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    id="postal-code"
                    name="postal-code"
                    type="text"
                    autoComplete="postal-code"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-xl text-center">{error}</p>}

          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              id="saveBtn"
              type="submit"
              className="cursor-pointer rounded-md w-1/2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
      <div className="orderSummary">
        <>
          {cartProducts.map((item) => (
            <div className="summaryProd" key={item._id}>
              <div className="summaryImg">
                <img src={item.thumbnail} />
              </div>
              <div key={item.id} className="summaryDis">
                <div>
                  <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                  <h4 className="category text-xs">{item.category}</h4>
                </div>
                <div>
                  <h4 className="price">
                    ${item.price} x {item.quantity}
                  </h4>
                </div>
              </div>
            </div>
          ))}

          <div className="totalSec">
            <div className="prices">
              <div className="pricesDetails">
                <h4>Subtotal</h4>
                <h4>${totalPrice.toFixed(2)}</h4>
              </div>
            </div>
            <div className="totalPrice">
              <h4>Total</h4>
              <h4>{totalPrice.toFixed(2)}</h4>
            </div>
          </div>
        </>
      </div>

      <Transition show={showModal}>
        <Dialog
          onClose={() => setShowModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-5 z-10">
            <div className="flex flex-col items-center text-center">
              <BanknotesIcon className="w-16 h-16 text-indigo-500 mb-4" />
              <Dialog.Title className="text-lg font-semibold">
                Payment Successful
              </Dialog.Title>
              <p className="mt-2 text-sm text-gray-600">
                Your order has been placed and will be delivered soon!
              </p>
              <button
                className="mt-6 inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("cart");
                  localStorage.removeItem("order");
                  setShowModal(false);
                  navigate("/Cart");
                  window.location.reload();
                }}
              >
                OK
              </button>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default CheckOut;
