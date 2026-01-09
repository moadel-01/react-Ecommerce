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
        { headers: { Authorization: `Bearer ${token}` } }
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
        Back to Profile
      </button>

      <div className="h-fit mt-10 grid lg:grid-cols-5 md:grid-cols-2  items-center ">
        <div className="md:border-r mb-5 md:mb-0  border-gray-200 lg:col-span-2">
          <p className="text-3xl font-medium mb-2">Order Details</p>
          <p className="text-lg">
            <span className="text-gray-500 text-base">Order ID: </span>
            {order._id}
          </p>
          <p className="text-lg "><span className="text-gray-500 text-base">Placed on: </span>{order?.createdAt?.split("T", 1)}</p>
          <p className="text-lg text-green-500 "><span className="text-gray-500 text-base">Status:</span> Delivered</p>
        </div>
        <div className="lg:ml-15 md:ml-5 lg:col-span-2">
          <p className="text-3xl font-medium mb-2 ">Order Owner</p>
          <p className="text-lg"><span className="text-gray-500 text-base">Owner ID: </span>{order?.customer?.customer_id}</p>
          <p className="text-lg"><span className="text-gray-500 text-base">Email: </span>{order?.customer?.email}</p>
          <p className="text-lg"><span className="text-gray-500 text-base">username: </span>{order?.customer?.username}</p>
        </div>
        <div></div>
      </div>

      <div className=" grid lg:grid-cols-2 w-full bg-gray-50 mt-5 rounded-lg border border-gray-200 p-8 justify-self-center">
        {orderProducts?.map((item) => (
          <div
            key={item.prod_id}
            className="grid sm:grid-cols-2 lg:odd:border-r gap-y-5 border-b last:border-b-0 pt-4 pb-4 last:pb-0 border-gray-300 "
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
