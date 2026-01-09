import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../../api/axios";

function AdminPalceholder() {
  const [productsNumber, setProductsNumber] = useState("");
  const [usersNumber, setUsersNumber] = useState("");
  const [messagesNumber, setMessagesNumber] = useState("");
  const [ordersNumber, setOrdersNumber] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get("https://express-ecommerce-kappa.vercel.app/products")
      .then((res) => {
        setProductsNumber(res.data.data.total);
      })
      .catch((res) => {
        console.log(res);
      });

    api
      .get("https://express-ecommerce-kappa.vercel.app/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log("users res:", res.data.data.length);
        setUsersNumber(res.data.data.length);
      })
      .catch((res) => {
        console.log("users Error", res);
      });

    api
      .get("https://express-ecommerce-kappa.vercel.app/contact", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log("messages res",res.data.data.length);
        setMessagesNumber(res.data.data.length);
      })
      .catch((res) => {
        console.log(res);
      });

    api
      .get("https://express-ecommerce-kappa.vercel.app/order", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrdersNumber(res.data.data.length);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div className="placeholder-page">
      <div className="bg-gray-50 py-2 sm:py-5">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <p className="mx-auto mt-2  text-center text-4xl  font-semibold tracking-tight text-balance text-gray-950 ">
            Welcome Back Admin
          </p>
          <h2 className="text-center text-base/7 font-semibold text-indigo-600">
            Take a moment to review your latest updates, manage content, and
            keep the site running smoothly.
          </h2>

          <div className="mt-10 grid gap-4 sm:mt-10 lg:grid-cols-3 lg:grid-rows-2 ">
            <div className="relative lg:row-span-2">
              <Link to={"users"}>
                <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl " />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center ">
                      Number of Users:{" "}
                      <span className="text-indigo-500">{usersNumber}</span>
                    </p>
                    {/* <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                    qui lorem cupidatat commodo.
                  </p> */}
                  </div>
                  <div className="@container relative min-h-90 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                    <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                      <img
                        alt=""
                        src="userTest.png"
                        className="size-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl" />
              </Link>
            </div>
            <div className="relative max-lg:row-start-1 ">
              <Link to={"orders"}>
                <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl " />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Total Orders:{" "}
                      <span className="text-indigo-500">{ordersNumber}</span>
                    </p>
                    {/* <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit
                    maiores impedit.
                  </p> */}
                  </div>
                  <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                    <img
                      alt=""
                      src="usersorders.png"
                      className=" w-full object-cover"
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl" />
              </Link>
            </div>
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <Link to={"messages"}>
                <div className="absolute inset-px rounded-lg bg-white" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Contact US Messages:{" "}
                      <span className="text-indigo-500">{messagesNumber}</span>
                    </p>
                    {/* <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                    suspendisse semper morbi.
                  </p> */}
                  </div>
                  <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                    <img
                      alt=""
                      src="usersmess.png"
                      className="w-full object-cover"
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
              </Link>
            </div>
            <div className="relative lg:row-span-2 ">
              <Link to={"products"}>
                <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl " />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Total Products:{" "}
                      <span className="text-indigo-500">{productsNumber}</span>
                    </p>
                    {/* <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Sit quis amet rutrum tellus ullamcorper ultricies libero
                    dolor eget sem sodales gravida.
                  </p> */}
                  </div>
                  {/* <div className="relative min-h-90 w-full grow"> */}
                  <div className="@container relative min-h-110 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                    <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                      <img
                        alt=""
                        src="uprodTest.png"
                        className="size-full object-cover object-top"
                      />
                    </div>
                  </div>
                  {/* <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-rose-900 shadow-2xl outline outline-white/10">
                    <div className="flex bg-indigo-500 outline outline-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                          NotificationSetting.jsx
                        </div>
                        <div className="border-r border-gray-600/10 px-4 py-2">
                          App.jsx
                        </div>
                      </div>
                    </div>
                    
                  </div> */}
                  {/* </div> */}
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPalceholder;
