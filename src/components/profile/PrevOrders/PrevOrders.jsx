import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";

function PrevOrders() {
  const token = localStorage.getItem("token");
  const userData = jwtDecode(token);
  const [order, setOrder] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);
  const { order_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(
        `https://express-ecommerce-kappa.vercel.app/order/${userData?.id}/orders/${order_id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        console.log("single order here", res);
        setOrder(res.data.data);
        setOrderProducts(res.data.data.products);
        console.log(order);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div className="xl:px-30">
      <button
        onClick={() => navigate("/profile")}
        className="bg-gray-50 hover:bg-gray-200 shadow-sm cursor-pointer border border-gray-200 px-4 py-2 rounded-lg sm:text-lg font-medium flex"
      >
        <img className="sm:h-4 h-3 self-center mr-2" src="/back.png" />
        Back to Profile
      </button>

      <div className="grid gap-y-4 bg-gray-50 rounded-lg border border-gray-200 mt-5 p-5">
        <div className="flex items-center justify-between">
          <p className="xl:text-3xl sm:text-2xl text-xl font-medium">Order Summary</p>
          <p className="sm:text-base text-sm font-medium bg-green-200 text-green-600 sm:px-4 px-2 py-1 rounded-full">
            {" "}
            Delivered
          </p>
        </div>

        <div className="sm:flex block gap-20">
          <p className="xl:text-base text-sm font-medium">
            <span className="text-gray-500 font-normal block">Order ID</span> #
            {order._id}
          </p>
          <p className="xl:text-base text-sm font-medium">
            <span className="text-gray-500 font-normal block">Order Date</span>{" "}
            {order?.createdAt?.split("T", 1)}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <div className="flex gap-3 items-center">
              <img src="/grayUser.png" className="h-7" />
              <p className="xl:text-xl text-lg font-medium">Contact Info</p>
            </div>

            <div className="border-b border-gray-200 my-3"></div>

            <div className="grid gap-y-3">
              <p className="xl:text-base text-sm text-black font-medium">
                <span className="text-gray-500 font-normal block">
                  Full Name
                </span>{" "}
                {order.contactInfo?.fullName}
              </p>
              <p className="xl:text-base text-sm text-black font-medium">
                <span className="text-gray-500 font-normal block">Email</span>{" "}
                {order.contactInfo?.email}
              </p>
              <p className="xl:text-base text-sm text-black font-medium">
                <span className="text-gray-500 font-normal block">
                  Phone Number
                </span>{" "}
                {order.contactInfo?.phoneNumber}
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <div className="flex gap-3 items-center">
              <img src="/grayLocation.png" className="h-7" />
              <p className="xl:text-xl text-lg font-medium">Shipping Address</p>
            </div>

            <div className="border-b border-gray-200 my-3"></div>

            <div className="grid gap-y-3">
              {/* <p className="text-base text-black"><span className="text-gray-500 font-normal block">City & District</span> <span className="block font-medium">{order.address?.city}, {order.address?.district}</span></p> */}
              <p className="xl:text-base text-sm text-black">
                <span className="text-gray-500 font-normal block">
                  City & District
                </span>{" "}
                <span className="font-medium">{order.address?.city}, </span>
                {order.address?.district}
              </p>
              <p className="xl:text-base text-sm text-black">
                <span className="text-gray-500 font-normal block">
                  Street & Building
                </span>
                <span className="font-medium">{order.address?.street}, </span>
                Building {order.address?.buildingNumber}
              </p>

              {order.address?.addressDetails === "" ? (
                <p className="xl:text-base text-sm text-rose-700 font-normal">
                  <span className="text-gray-500 font-normal block">
                    Additional Details
                  </span>{" "}
                  There is no Additional Address Details in this Order.
                </p>
              ) : (
                <p className="xl:text-base text-sm text-black font-normal">
                  <span className="text-gray-500 font-normal block">
                    Additional Details
                  </span>{" "}
                  {order.address?.addressDetails}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      

      <div className="grid lg:grid-cols-2 w-full bg-gray-50 mt-5 rounded-lg border lg:[&>*:nth-last-child(2):nth-child(odd)]:border-b-0 border-gray-200 p-5 justify-self-center">
        {orderProducts?.map((item) => (
          <div
            key={item.prod_id}
            className="grid sm:grid-cols-4 lg:odd:border-r gap-y-5 bg-amber-20 border-b last:border-b-0 py-5 last:pb-0 border-gray-200 "
          >
            <div className="sm:flex sm:justify-center justify-self-center sm:justify-self-auto col-span-1 bg-pink-20">
              <img src={item.thumbnail} className="lg:h-30 sm:h-30 h-30" />
            </div>

            <div className="self-center sm:col-span-2 text-center sm:text-start grid gap-y-5 bg-green-20">
              <p className="text-xl font-medium ">{item.title}</p>
              <p className="text-gray-600 text-lg font-medium sm:justify-self-start">
                {item.quantity} <span className="text-base">x</span> $
                {item.price}
              </p>
            </div>

            <div className="col-span-1 grid sm:grid-cols-1 grid-cols-2 justify-items-center sm:gap-3 self-center bg-sky-20">
              <Link to={`/${item.prod_id}`}>
                <button className="cursor-pointer bg-indigo-500 hover:bg-indigo-400 text-white h-fit w-25 py-2 rounded-lg ">
                  Buy Again
                </button>
              </Link>
              <Link to={`review/${item.prod_id}`}>
                <button className="cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-white h-fit w-25 py-2 rounded-lg">
                  Review
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Outlet />
    </div>
  );
}

export default PrevOrders;
