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
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [CVC, setCVC] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [addressDetails, setAddressDetails] = useState("");

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "") // Remove non-numeric characters
      .slice(0, 16) // Allow maximum 16 digits
      .replace(/(\d{4})(?=\d)/g, "$1 - ");
  };

  const formatExpDate = (value) => {
    return value
      .replace(/\D/g, "") // Remove non-numeric characters
      .slice(0, 6) // Allow maximum 16 digits
      .replace(/(\d{2})(?=\d)/g, "$1 / ");
  };

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
      contanctInfo: {
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
      },

      address: {
        city: city,
        district: district,
        street: street,
        buildingNumber: buildingNumber,
        addressDetails: addressDetails,
      },

      cartProducts: products,
      totalPrice: Number(order.totalPrice),
    };

    console.log(finalOrder);

    api
      .post("https://express-ecommerce-kappa.vercel.app/order", finalOrder, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
  };

  const cartProducts = JSON.parse(localStorage.getItem("cart"));

  const totalPrice = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="checkoutCont">
      <div className="checkoutForm">
        <form onSubmit={handleSubmit}>
          <div className="">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Contact & Shipping Information
            </h2>

            <div className="xl:mt-10 mt-5 grid grid-cols-2 lg:gap-x-6 gap-x-3 xl:gap-y-8 lg:gap-y-5 md:gap-y-3 gap-y-5 sm:grid-cols-4">
              <div className="lg:col-span-1 col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="full-name"
                    name="full-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="lg:col-span-1 col-span-2">
                <label
                  htmlFor="Phone Number"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="full-name"
                    name="full-name"
                    type="text"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="lg:col-span-2 md:col-span-4 col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    id="Email"
                    name="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="card"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Card Number
                </label>
                <div className="mt-2">
                  <input
                    id="card"
                    name="card"
                    type="text"
                    inputMode="numeric"
                    placeholder="XXXX - XXXX - XXXX - XXXX"
                    value={cardNumber}
                    onChange={(e) => {
                      setCardNumber(formatCardNumber(e.target.value));
                    }}
                    maxLength={25}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="Exp"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Expiration Date
                </label>
                <div className="mt-2">
                  <input
                    id="Exp"
                    name="Exp"
                    type="text"
                    inputMode="numeric"
                    placeholder="MM / YY"
                    maxLength={7}
                    value={expDate}
                    onChange={(e) => {
                      setExpDate(formatExpDate(e.target.value));
                    }}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    value={CVC}
                    onChange={(e) => {
                      setCVC(e.target.value.replace(/\D/g, ""));
                    }}
                    placeholder="XXX"
                    className="block w-full rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-1 sm:col-start-1">
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
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="district"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  District
                </label>
                <div className="mt-2">
                  <input
                    id="district"
                    name="district"
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="street"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Street
                </label>
                <div className="mt-2">
                  <input
                    id="street"
                    name="street"
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="building-number"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Building No.
                </label>
                <div className="mt-2">
                  <input
                    id="building-number"
                    name="building-number"
                    type="text"
                    required
                    value={buildingNumber}
                    onChange={(e) => setBuildingNumber(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Additional Directions
                </label>
                <div className="mt-2">
                  <textarea
                    id="street-address"
                    name="street-address"
                    type="text"
                    value={addressDetails}
                    onChange={(e) => setAddressDetails(e.target.value)}
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 sm:h-fit  resize-none text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-xl text-center">{error}</p>}

          <div className="lg:mt-8 mt-5 flex items-center md:justify-end justify-center gap-x-6">
            <button
              id="saveBtn"
              type="submit"
              className="cursor-pointer rounded-md md:w-1/3 w-1/2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
      <div className="orderSummary grid content-between gap-10 bg-sky-">
        <div className="">
          {cartProducts.map((item) => (
            <div className="summaryProd" key={item._id}>
              <div className="summaryImg">
                <img src={item.thumbnail} />
              </div>
              <div key={item.id} className="summaryDis items-center">
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
        </div>

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
