import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Users/User.css";
import { Link } from "react-router-dom";
import api from "../../../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(false);
    allOrders();
  }, []);

  const allOrders = async () => {
    await api
      .get("https://express-ecommerce-kappa.vercel.app/order", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("orders", res);
        setOrders(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOrders([]);

    if (!search) {
      setLoading(false);
      allOrders();
      return;
    }

    await api
      .get(`https://express-ecommerce-kappa.vercel.app/order/search`, {
        params: { search },
      })
      .then((res) => {
        console.log("Search", res);
        setOrders(res.data.data.orders);
        setLoading(false);
      })
      .catch((res) => {
        console.log(res);
        setLoading(false);
      });
  };

  const handleClear = () => {
    setLoading(true);
    setOrders([]);
    setSearch("");
    allOrders();
  };

  return (
    <div className="grid min-h-fit p-5">
      <div className="h-fit mb-5">
        <p className="mt-5 mb-1 mx-auto  text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 ">
          Orders Management
        </p>
        <h2 className="text-center mb-5 text-lg font-semibold text-indigo-600">
          View and manage all customer orders in one place.
        </h2>
      </div>

      <div className="h-fit sm:w-1/2 w-full justify-self-center mb-10">
        <form onSubmit={handleSearch} className="grid gap-5">
          <div className="w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Order ID, Owner's Email or Owner's Username"
              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div className="flex gap-2 justify-center">
            <button
              type="submit"
              className={`rounded-lg w-20 py-2 border border-indigo-500 text-white cursor-pointer ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              Search
            </button>
            <button
              onClick={handleClear}
              className={` rounded-lg w-20 py-2 border border-gray-500 text-white cursor-pointer ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <div className="gap-4 p-2 grid xl:grid-cols-3 md:grid-cols-2">
        {orders.map((item) => (
          <div
            key={item._id}
            className="bg-gray-100 h-fit rounded-md grid grid-rows-4 border border-gray-300 shadow-sm  font-medium"
          >
            <div className="row-span-3 justify-items-start self-center p-5 text-md/60 ">
              {/* <p className="text-xl font-medium">{item.email}</p> */}
              <p className="">
                <span className="text-sm font-normal text-gray-500">
                  Order ID:
                </span>{" "}
                {item._id}
              </p>
              <p className="">
                <span className="text-sm font-normal text-gray-500">
                  Order owner:
                </span>{" "}
                {item.customer.username}
              </p>
              <p className="">
                <span className="text-sm font-normal text-gray-500">
                  Order total price:
                </span>{" "}
                ${item.totalPrice}
              </p>
              <p className="">
                <span className="text-sm font-normal text-gray-500">
                  Sent At:
                </span>{" "}
                {item.createdAt.split("T", 1)}
              </p>
            </div>
            <div className="  border-t border-gray-300">
              <Link to={`${item._id}`} className="w-full">
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "orderOwner",
                      item.customer.customer_id
                    );
                  }}
                  className="cursor-pointer w-full h-full rounded-es-md border-r border-gray-300 hover:bg-indigo-300 transition duration-300 font-normal"
                >
                  View Order Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
