import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Users/User.css";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import api from "../../../api/axios";

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [messageID, setMessageID] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!search) {
      setLoading(false);
      allContactMessages();
    } else {
      setLoading(false);
      filteredMessages();
    }
  }, [search]);

  const allContactMessages = async () => {
    await api
      .get("https://express-ecommerce-kappa.vercel.app/contact", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setMessages(res.data.data);
        setLoading(false);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const handleDelete = (id) => {
    api
      .delete(
        `https://express-ecommerce-kappa.vercel.app/contact/${id}`,
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

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setMessages([]);

  // if (!search) {
  //   setLoading(false);
  //   allContactMessages();
  //   return;
  // }

  const filteredMessages = async () => {
    await api
      .get(
        `https://express-ecommerce-kappa.vercel.app/contact/search`,
        {
          params: { search },
        }
      )
      .then((res) => {
        console.log("Search", res);
        setMessages(res.data.data.messages);
        setLoading(false);
      })
      .catch((res) => {
        console.log(res);
        setLoading(false);
      });
  };

  const handleClear = () => {
    setLoading(true);
    setMessages([]);
    setSearch("");
    allContactMessages();
  };

  return (
    <div className="grid min-h-fit p-5">
      <div className="h-fit mb-5">
        <p className="mt-5 mb-1 mx-auto  text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 ">
          Contact Us Messages
        </p>
        <h2 className="text-center mb-5 text-lg font-semibold text-indigo-600">
          Review and respond to messages sent by users.
        </h2>
      </div>

      <div className="h-fit sm:w-1/2 w-full justify-self-center mb-10">
        <form className="grid gap-1">
          <label className="block text-sm/6 font-medium text-gray-900">
            Which subject messages to show?
          </label>
          <div className="w-full grid grid-cols-1">
            <select
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Messages Subject"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value={""} disabled selected hidden>
                choose one
              </option>
              <option value={""}>All Messages</option>
              <option value={"technical"}>Technical issues</option>
              <option value={"orders"}>Orders & Shipping issues</option>
              <option value={"billing"}>Billing inquiries</option>
              <option value={"else"}>else</option>
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </div>
          {/* <div className="flex gap-2 justify-center">
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
          </div> */}
        </form>
      </div>

      <div className="gap-4 p-2 grid xl:grid-cols-4 md:grid-cols-3">
        {messages.length === 0 && search && (
          <p className="text-gray-500 mt-4 text-3xl col-span-4 text-center">
            No Messages found for "{search}"
          </p>
        )}
        {messages.map((item) => (
          <div
            key={item._id}
            className="bg-gray-100 h-fit rounded-md grid grid-rows-4 text-md/8 font-medium border border-gray-300 shadow-md"
          >
            <div className="row-span-3 justify-items-start self-center p-5">
              {/* <p className="text-xl font-medium">{item.email}</p> */}
              <p className="">
                <span className="text-sm font-normal text-gray-500">
                  Sent by:
                </span>{" "}
                {item.name}
              </p>
              <p className="">
                <span className="text-sm font-normal text-gray-500">
                  Message about:
                </span>{" "}
                {item.subject}
              </p>
              <p className="">
                <span className="text-sm font-normal text-gray-500">
                  Sent At:
                </span>{" "}
                {item.createdAt.split("T", 1)}
              </p>
            </div>
            <div className="row-span-1 grid grid-cols-2 border-t border-gray-300">
              <Link to={`${item._id}`} className="block w-full">
                <button className="cursor-pointer w-full h-full rounded-es-md border-r border-gray-300 hover:bg-indigo-300 transition duration-300 font-normal">
                  View
                </button>
              </Link>
              <Link className="block w-full ">
                <button
                  onClick={() => {
                    setOpenModal(true), setMessageID(item._id);
                  }}
                  className="cursor-pointer rounded-ee-md w-full h-full hover:bg-rose-300 transition duration-300 font-normal"
                >
                  Delete
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 self-center items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-6 text-indigo-500"
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
                        You're about to permanently delete this Message.
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
                    handleDelete(messageID);
                  }}
                >
                  Delete
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ContactMessages;
