import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";

function UserSingleOrder() {
  const token = localStorage.getItem("token");
  const ownerID = localStorage.getItem("orderOwner");
  const [order, setOrder] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);
  const { o } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(
        `https://express-ecommerce-kappa.vercel.app/order/${ownerID}/orders/${o}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        console.log("single order here", res);
        setOrder(res.data.data);
        setOrderProducts(res.data.data.products);
        // console.log(orderProducts);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  return (
    <div className="md:p-10 p-5">
      <button
        onClick={() => {
          navigate("/adminDashboard/orders");
          localStorage.removeItem("orderOwner");
        }}
        className="bg-gray-50 hover:bg-gray-200 shadow-sm cursor-pointer border border-gray-200 px-4 py-2 rounded-lg text-lg font-medium flex"
      >
        <img className="h-4 self-center mr-2" src="/back.png" />
        Back to all Orders
      </button>

      <div className="grid gap-y-4 bg-gray-50 rounded-lg border border-gray-200 mt-5 p-5">
        <div className="flex items-center justify-between">
          <p className="xl:text-3xl sm:text-2xl text-xl font-medium">
            Order Summary
          </p>
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

        <div className="grid sm:grid-cols-3 gap-5">
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <div className="flex gap-3 items-center">
              <img src="/grayUser.png" className="h-7" />
              <p className="xl:text-xl text-lg font-medium">Order Owner</p>
            </div>

            <div className="border-b border-gray-200 my-3"></div>

            <div className="grid gap-y-3">
              <p className="xl:text-base text-sm text-black font-medium">
                <span className="text-gray-500 font-normal block">
                  Owner ID
                </span>{" "}
                {order.customer?.customer_id}
              </p>
              <p className="xl:text-base text-sm text-black font-medium">
                <span className="text-gray-500 font-normal block">Email</span>{" "}
                {order.customer?.email}
              </p>
              <p className="xl:text-base text-sm text-black font-medium">
                <span className="text-gray-500 font-normal block">
                  Username
                </span>{" "}
                {order.customer?.username}
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <div className="flex gap-3 items-center">
              <img src="/grayContact.png" className="h-7" />
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

      <div className=" grid lg:grid-cols-2 w-full bg-gray-50 mt-5 rounded-lg border lg:[&>*:nth-last-child(2):nth-child(odd)]:border-b-0 border-gray-200 p-5 justify-self-center">
        {orderProducts?.map((item) => (
          <div
            key={item.prod_id}
            className="grid sm:grid-cols-2 lg:odd:border-r gap-y-5 border-b last:border-b-0 pt-4 pb-4 p-4 last:pb-0 border-gray-300 "
          >
            <div className="justify-self-center col-span-1">
              <img src={item.thumbnail} className="lg:h-40 sm:h-30 h-30 " />
            </div>
            <div className="self-center col-span-1 justify-self-center grid gap-y-5 ">
              <p className="text-xl font-medium ">{item.title}</p>
              <p className="text-gray-600 text-lg font-medium justify-self-center">
                {item.quantity} <span className="text-base">x</span> $
                {item.price}
              </p>
            </div>

            {/* <div className="col-span-2 flex self-center sm:justify-center justify-center">
              <Link to={`/${item.prod_id}`}>
                <button className="cursor-pointer bg-indigo-500 hover:bg-indigo-400 text-white h-fit px-2 py-2 rounded-lg ">
                  Buy Again
                </button>
              </Link>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSingleOrder;
