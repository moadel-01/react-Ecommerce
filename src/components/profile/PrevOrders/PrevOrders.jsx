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
        className="bg-gray-50 hover:bg-gray-200 shadow-sm cursor-pointer border border-gray-200 px-4 py-2 rounded-lg text-lg font-medium flex"
      >
        <img className="h-4 self-center mr-2" src="/back.png" />
        Back to Profile
      </button>

      <div className="grid grid-cols-2 gap-y-4 bg-gray-50 rounded-lg border border-gray-200  mt-5 p-8">
        <div>
          <p className="text-3xl font-medium mb-2">Order Details</p>
          <p className="text-base text-gray-500"><span className="font-medium text-black">Order ID:</span> #{order._id}</p>
          <p className="text-base text-gray-500"><span className="font-medium text-black">Placed On:</span> {order?.createdAt?.split(
            "T",
            1,
          )}</p>
          <p className="text-base font-medium text-green-500"> Delivered</p>
        </div>

        <div className="bg-white border border-gray-300 w-fit p-5 rounded-lg">
          <p className="text-3xl font-medium mb-2">Contact Info</p>
          <p className="text-base text-gray-500"><span className="font-medium text-black">Full Name:</span> {order.contactInfo?.fullName}</p>
          <p className="text-base text-gray-500"><span className="font-medium text-black">Email:</span> {order.contactInfo?.email}</p>
          <p className="text-base text-gray-500"><span className="font-medium text-black">Phone Number:</span> {order.contactInfo?.phoneNumber}</p>
        </div>

        <div className="col-span-2 border border-gray-200 w-1/2 justify-self-center my-5"></div>

        <div className="col-span-2">
          <p className="text-3xl font-medium mb-2">Address Details</p>

          <div className="grid grid-cols-5">
            <div>
          <p className="text-base text-gray-500"><span className="font-medium text-black">City:</span> {order.address?.city}</p>
          <p className="text-base text-gray-500"><span className="font-medium text-black">District:</span> {order.address?.district}</p>
          </div>

          <div className="col-span-4">
          <p className="text-base text-gray-500"><span className="font-medium text-black">Street:</span> {order.address?.street}</p>
          <p className="text-base text-gray-500"><span className="font-medium text-black">Building Number:</span> {order.address?.buildingNumber}</p>
          <p className="text-base text-gray-500"><span className="font-medium text-black">Additional Details:</span> {order.address?.addressDetails}</p>
          </div>
          </div>
        </div>

        
      </div>

      <div className="grid lg:grid-cols-2 w-full bg-gray-50 mt-5 rounded-lg border lg:[&>*:nth-last-child(2):nth-child(odd)]:border-b-0 border-gray-200 p-8 justify-self-center">
        {orderProducts?.map((item) => (
          <div
            key={item.prod_id}
            className="grid sm:grid-cols-6 lg:odd:border-r gap-y-5 border-b last:border-b-0 pt-4 pb-4 last:pb-0 border-gray-300 "
          >
            <div className="justify-self-center col-span-2">
              <img src={item.thumbnail} className="lg:h-40 sm:h-30 h-30 " />
            </div>
            <div className="self-center col-span-2 justify-self-center grid gap-y-5 ">
              <p className="text-xl font-medium ">{item.title}</p>
              <p className="text-gray-600 text-lg font-medium justify-self-start">
                {item.quantity} <span className="text-base">x</span> $
                {item.price}
              </p>
            </div>

            <div className="col-span-2 grid gap-3 self-center sm:justify-center justify-center">
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
