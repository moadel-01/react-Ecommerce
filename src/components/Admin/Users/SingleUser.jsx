import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";

export default function SingleUser() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const userData = jwtDecode(token);
  const navigate = useNavigate();
  const { user_id } = useParams();

  console.log(userData.exp * 1000, " ", Date.now());

  useEffect(() => {
    api
      .get(
        `https://express-ecommerce-kappa.vercel.app/users/${user_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        // console.log("response here", res);
        setUser(res.data.data);
      })
      .catch((res) => {
        console.log("error here", res.status);
      });
  }, []);

  return (
    <div className="min-h-screen p-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-10 bg-gray-50 hover:bg-gray-200 shadow-sm cursor-pointer border border-gray-200 px-4 py-2 rounded-lg text-lg font-medium flex"
      >
        <img className="h-4 self-center mr-2" src="/back.png" />
        Back to User Configration
      </button>
      <h1 className="text-2xl font-bold mb-4">
        <span className="text-indigo-600">{user?.username}'s </span> Data.
      </h1>
      <div className="h-[2px] rounded bg-gray-200 w-full mb-5"></div>

      <div className="grid grid-cols-2 gap-6 py-4 md:py-8 lg:grid-cols-4 xl:gap-16 p-2 ">
        <div>
          <img className="h-10" src="/cart1.png" />
          <p className="text-gray-500 text-lg font-semibold mt-2 mb-2">
            Orders made
          </p>
          <p className="text-gray-900 text-2xl font-semibold">
            {orders.length}
          </p>
        </div>
        <div>
          <img className="h-10" src="/star1.png" />
          <p className="text-gray-500 text-lg font-semibold mt-2 mb-2">
            Reviewes Added
          </p>
          <p className="text-gray-900 text-2xl font-semibold">24</p>
        </div>
      </div>

      <div className="h-[2px] rounded bg-gray-200 w-full mb-5"></div>

      <div className=" grid grid-cols-1 p-2 sm:grid-cols-2">
        <div className="p-2 grid content-between">
          <div className="p-3 flex gap-2">
            <div className="bg-indigo-100 rounded-lg">
              <img src="/account.png" className="" />
            </div>
            <div>
              <div className="bg-indigo-100 text-indigo-600 font-medium p-1 text-xs rounded inline-block mb-1">
                {user?.role == "USER" ? <div>Customer</div> : <div>Admin</div>}
              </div>
              <div className="text-2xl font-medium">{user?.username}</div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xl font-medium">Email Address</p>
            <p className="text-lg font-base text-gray-500">{user?.email}</p>
          </div>
          <div className="p-4">
            <p className="text-xl font-medium">Account Creation Date</p>
            <p className="text-lg font-base text-gray-500">
              {user?.createdAt.split("T", 1)}
            </p>
          </div>
        </div>
        <div className="p-2 grid content-between">
          <div className="p-4">
            <p className="text-xl font-medium">Account ID</p>
            <p className="text-lg font-base text-gray-500">{user?._id}</p>
          </div>
          <div className="p-4">
            <p className="text-xl font-medium">Age</p>
            <p className="text-lg font-base text-gray-500">{user?.age}</p>
          </div>
          <div className="p-4">
            <p className="text-xl font-medium ">Last Account Update</p>
            <p className="text-lg font-base text-gray-500">
              {user?.updatedAt.split("T", 1)}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-50 mt-10 rounded-lg border border-gray-200 p-8">
        <p className="font-medium text-2xl">{user?.username}'s Previous Orders</p>
        {useEffect(() => {
          api
            .get(
              `https://express-ecommerce-kappa.vercel.app/order/${user_id}/orders`,
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
              console.log("orders here", res);
              setOrders(res.data.data);
            })
            .catch((res) => {
              console.log(res);
            });
        }, [])}
        <div>
          {orders?.length == 0 ? (
            <div className="justify-self-center mt-5">
              <p className="justify-self-center text-2xl font-medium my-2">
                Looks like{" "}
                <span className="text-indigo-500">{user?.username}</span>{" "}
                haven't bought anything so far
              </p>
            </div>
          ) : (
            <div>
              {orders.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-wrap justify-between border-b last:border-b-0 pt-8 pb-8 last:pb-0 border-gray-300 gap-5"
                >
                  <div>
                    <p className="lg:font-medium text-gray-400 lg:text-lg">
                      Order ID:
                    </p>
                    <p className="lg:font-medium lg:text-lg">{item._id}</p>
                  </div>
                  <div>
                    <p className="lg:font-medium text-gray-400 lg:text-lg">
                      Date:
                    </p>
                    <p className="lg:font-medium lg:text-lg">
                      {item.createdAt.split("T", 1)}
                    </p>
                  </div>
                  <div>
                    <p className="lg:font-medium text-gray-400 lg:text-lg">
                      Price:
                    </p>
                    <p className="lg:font-medium lg:text-lg">
                      ${item.totalPrice}
                    </p>
                  </div>
                  <div>
                    <p className="lg:font-medium text-gray-400 lg:text-lg">
                      No.of Products:
                    </p>
                    <p className="lg:font-medium lg:text-lg">
                      {item.products.length}
                    </p>
                  </div>
                  {/* <div>
                    <Link to={`prevOrders/${item._id}`}>
                      <button className="cursor-pointer flex p-2 bg-white border rounded-lg border-gray-300 font-medium hover:bg-indigo-200">
                        Order Details
                        <img src="/forward1.png" className="h-4 mt-1 ml-1" />
                      </button>
                    </Link>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* <p>Name: Mohamed Adel</p>
      <p>Email: mohamed@email.com</p> */}
    </div>
  );
}
