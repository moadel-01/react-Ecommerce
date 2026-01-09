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
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        // console.log("single order here", res);
        setOrder(res.data.data);
        setOrderProducts(res.data.data.products);
        console.log(order);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div className="lg:px-30">
      <button
        onClick={() => navigate("/profile")}
        className="bg-gray-50 hover:bg-gray-200 shadow-sm cursor-pointer border border-gray-200 px-4 py-2 rounded-lg text-lg font-medium flex"
      >
        <img className="h-4 self-center mr-2" src="/back.png" />
        Back to Profile
      </button>

      <p className="text-4xl font-medium mb-2 mt-10">Order Details</p>
      <p className="text-xl">{`Order ID: #${order._id}`}</p>
      <p className="text-lg ">{`Placed On: ${order?.createdAt?.split(
        "T",
        1
      )}`}</p>
      <p className="text-lg text-green-500"> Delivered</p>

      <div className="grid lg:grid-cols-2 w-full bg-gray-50 mt-5 rounded-lg border border-gray-200 p-8 justify-self-center">
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
