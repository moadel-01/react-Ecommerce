import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import api from "../../../api/axios";

export default function UserInfo() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const userData = jwtDecode(token);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalfor, setModalFor] = useState("");
  const [userID, setUserID] = useState("");
  const [reviewID, setReviewID] = useState("");
  const [productID, setProductID] = useState("");
  // console.log(userData.exp * 1000, " ", Date.now());
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("link",api);

  useEffect(() => {
    api
      .get(
        `https://express-ecommerce-kappa.vercel.app/users/${userData.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        // console.log("response here", res);
        setUser(res.data.data);
      })
      .catch((res) => {
        console.log("error here", res);
      });
  }, []);

  const handleDeleteAccount = (id) => {
    api
      .delete(
        `https://express-ecommerce-kappa.vercel.app/users/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        // console.log(res);
        alert("Account deleted successfully");
        navigate("/");
        localStorage.removeItem("token");
        window.location.reload();
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const handleDeleteReview = async (id, prod_id) => {
    await api
      .delete(
        `https://express-ecommerce-kappa.vercel.app/products/${prod_id}/reviews/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const DeleteAccount = (id) => {
    setModalFor("DelAccount");
    setOpenModal(true);
    setUserID(id);
  };

  const DeleteReview = (id, prod_id) => {
    setModalFor("DelReview");
    setOpenModal(true);
    setReviewID(id);
    setProductID(prod_id);
  };
  return (
    <div className="min-h-screen xl:px-30">
      <h1 className="text-2xl font-bold mb-4">
        Welcome Back, <span className="text-indigo-600">{user?.username}</span>.
      </h1>
      <div className="h-[2px] rounded bg-indigo-100 w-full mb-5"></div>

      <div className="grid grid-cols-2 gap-6 py-4 md:py-8 lg:grid-cols-3 justify-items-center xl:gap-16 p-2 ">
        <a
          href="#ordersDiv"
          className="bg-indigo-100 hover:bg-indigo-200 rounded-xl md:w-60 p-5"
        >
          <img className="h-10" src="./cart1.png" />
          <p className="text-gray-500 text-lg font-semibold mt-2 mb-2">
            Orders made
          </p>
          <p className="text-gray-900 text-2xl font-semibold">
            {orders.length}
          </p>
        </a>
        <a
          href="#reviewsDiv"
          className="bg-indigo-100 hover:bg-indigo-200 rounded-xl md:w-60 p-5"
        >
          <img className="h-10" src="./star1.png" />
          <p className="text-gray-500 text-lg font-semibold mt-2 mb-2">
            Reviewes Added
          </p>
          <p className="text-gray-900 text-2xl font-semibold">
            {reviews.length}
          </p>
        </a>
        <Link
          to={"/Cart"}
          className="bg-indigo-100 hover:bg-indigo-200 rounded-xl md:w-60 p-5"
        >
          <img className="h-10" src="./heart1.png" />
          <p className="text-gray-500 text-lg font-semibold mt-2 mb-2">
            Product in your Cart
          </p>
          <p className="text-gray-900 text-2xl font-semibold">{cart.length}</p>
        </Link>
      </div>

      <div className="h-[2px] rounded bg-indigo-100 w-full mb-5"></div>

      <div className=" grid grid-cols-1 p-2 sm:grid-cols-2">
        <div className="p-2 grid content-between">
          <div className="p-3 flex gap-2">
            <div className="bg-indigo-100 rounded-lg">
              <img src="./account.png" className="" />
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

      <div className="flex justify-start gap-5 pl-7 mb-20">
        <Link to={`edit`}>
          <button className="cursor-pointer bg-indigo-500 hover:bg-indigo-400 py-2 px-4 rounded-lg text-white font-medium flex">
            <img src="./edit2.png" className="h-6 self-center mr-2" />
            Edit your Data
          </button>
        </Link>
        <button
          onClick={() => {
            DeleteAccount(user?._id);
          }}
          className="cursor-pointer bg-rose-500 hover:bg-rose-400 py-2 px-4 rounded-lg text-white font-medium flex"
        >
          <img src="./deluser2.png" className="h-6 self-center mr-2" />
          Delete Account
        </button>
      </div>

      <div
        id="ordersDiv"
        className="h-[1px] rounded bg-indigo-100 w-full mb-20"
      ></div>

      <div className="w-full bg-gray-50 mt-10 rounded-lg border border-gray-200 p-8">
        <p className="font-medium text-2xl">Your Previous Orders</p>
        {useEffect(() => {
          api
            .get(
              `https://express-ecommerce-kappa.vercel.app/order/${userData?.id}/orders`,
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
              {
                /* console.log("orders here", res); */
              }
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
                Looks like you haven't bought anything so far
              </p>
              <p className="justify-self-center text-lg text-indigo-600">
                Start shopping and place your first order
              </p>
              <Link to={"/"}>
                <button className="flex justify-self-center mt-9 bg-indigo-500 py-2 px-4 rounded-lg text-white font-medium cursor-pointer">
                  Start Shopping
                </button>
              </Link>
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
                  <div>
                    <Link to={`prevOrders/${item._id}`}>
                      <button className="cursor-pointer flex p-2 bg-white border rounded-lg border-gray-300 font-medium hover:bg-indigo-200">
                        Order Details
                        <img src="./forward1.png" className="h-4 mt-1 ml-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        id="reviewsDiv"
        className="h-[2px] rounded bg-indigo-100 w-full my-20"
      ></div>

      <div className="w-full bg-gray-50 mt-10 rounded-lg border border-gray-200 p-8">
        <p className="font-medium text-2xl">Reviews you added</p>
        {useEffect(() => {
          api
            .get(
              `https://express-ecommerce-kappa.vercel.app/users/${userData?.id}/Reviews`,
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
              console.log("reviews", res);
              setReviews(res.data.data);
            })
            .catch((res) => {
              console.log(res);
            });
        }, [])}
        <div>
          {reviews?.length == 0 ? (
            <div className="justify-self-center mt-5">
              <p className="justify-self-center text-2xl font-medium my-2">
                Looks like you haven't placed any Review so far
              </p>
            </div>
          ) : (
            <div>
              {reviews.map((item) => (
                <div
                  key={item._id}
                  className="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-1 justify-between border-b last:border-b-0 pt-8 pb-8 last:pb-0 border-gray-300 gap-5"
                >
                  <div className="flex bg-amber-30 gap-5 md:col-span-2">
                    <div>
                      <img src={item.product.thumbnail} className="h-20" />
                    </div>
                    <div className="self-center md:self-start mt-3">
                      <p className="lg:font-medium lg:text-lg">{item.product.title}</p>
                      <p className="lg:font-medium lg:text-lg">${item.product.price}</p>
                    </div>
                  </div>
                  <div className="self-center md:col-span-2">
                    <p className="lg:font-medium text-gray-400 lg:text-lg">
                      Comment:
                    </p>
                    <p className="lg:font-medium lg:text-lg">{item.comment}</p>
                  </div>
                  <div className="self-center md:col-span-1 md:self-start md:justify-self-center">
                    <p className="lg:font-medium text-gray-400 lg:text-lg">
                      Rating:
                    </p>
                    <p className="lg:font-medium lg:text-lg">{item.rating}</p>
                  </div>
                  <div className="lg:col-span-1 lg:grid-cols-1 lg:self-start grid grid-cols-2 md:col-span-3 md:col-start-4 justify-items-center lg:gap-3">
                    <Link
                      to={`Reviews/${item.product.prod_id}/updateReview/${item._id}`}
                    >
                      <button className="bg-indigo-500 hover:bg-indigo-400 text-white cursor-pointer rounded-lg py-2 sm:w-30 w-20 md:mr-5 lg:mr-0">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        DeleteReview(item?._id, item?.product?.prod_id);
                      }}
                      className="bg-rose-500 hover:bg-rose-400 text-white cursor-pointer rounded-lg py-2 sm:w-30 w-20 "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* <p>Name: Mohamed Adel</p>
      <p>Email: mohamed@email.com</p> */}

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            {modalfor === "DelAccount" && (
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 self-center items-center justify-center rounded-full bg-rose-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="size-6 text-rose-500"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Delete Confirmation
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          You're about to permanently delete your Account.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition duration-300 sm:ml-3 sm:w-auto cursor-pointer"
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 transition duration-300 sm:ml-3 sm:w-auto cursor-pointer "
                    onClick={() => {
                      setOpenModal(false);
                      handleDeleteAccount(userID);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </DialogPanel>
            )}

            {modalfor === "DelReview" && (
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 self-center items-center justify-center rounded-full bg-rose-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="size-6 text-rose-500"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Delete Confirmation
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          You're about to permanently delete this Review.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition duration-300 sm:ml-3 sm:w-auto cursor-pointer"
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 transition duration-300 sm:ml-3 sm:w-auto cursor-pointer "
                    onClick={() => {
                      setOpenModal(false);
                      handleDeleteReview(reviewID, productID);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </DialogPanel>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
