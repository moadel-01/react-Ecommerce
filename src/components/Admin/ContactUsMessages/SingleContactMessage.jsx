import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import api from "../../../api/axios";

function SingleContactMessage() {
  const [message, setMessage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [messageID, setMessageID] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { m } = useParams();

  useEffect(() => {
    api
      .get(`https://express-ecommerce-kappa.vercel.app/contact/${m}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setMessage(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const handleDelete = (id) => {
    api
      .delete(
        `https://express-ecommerce-kappa.vercel.app/contact/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res);
        navigate("/adminDashboard/messages");
        window.location.reload();
      })
      .catch((res) => {
        console.log(res);
      });
  };
  return (
    <div className="md:p-5 p-5 min-h-screen ">
      <button
        onClick={() => navigate("/adminDashboard/messages")}
        className="bg-gray-50 hover:bg-gray-200 mb-5 shadow-sm cursor-pointer border border-gray-200 px-4 py-2 rounded-lg text-base font-medium flex"
      >
        <img className="h-4 self-center mr-2" src="/back.png" />
        Back to Conatct Us Messages
      </button>

      <p className="text-3xl font-medium mb-2 ">Message Details</p>
      <p className="text-md">{`Message ID: #${message?._id}`}</p>
      {/* <p className="text-md ">{`Sent at: ${message?.createdAt?.split(
        "T",
        1
      )}`}</p> */}

      <div className="grid  w-full bg-gray-50 mt-2 rounded-lg border border-gray-200 md:p-8 p-4 justify-self-center">
        {
          <div>
            <p className="text-sm text-gray-500">
              Message sent By:{" "}
              <span className="text-xl text-gray-950 font-medium">
                {message?.name}
              </span>
            </p>

            <p className="text-sm text-gray-500">
              Eamil:{" "}
              <span className="text-xl text-gray-950 font-medium">
                {message?.email}
              </span>
            </p>

            <p className="text-sm text-gray-500">
              Message About:{" "}
              <span className="text-xl text-indigo-500 font-medium">
                {message?.subject}
              </span>
            </p>

            <div className="h-[1px] rounded bg-gray-200 w-full my-5"></div>

            <p className="text-xl text-gray-950 font-medium ">Message:</p>
            <div className="md:w-4/5 bg-white my-5 rounded-lg border border-gray-200 md:text-justify md:p-8 p-4 min-h-40 justify-self-center content-center">
              <p className="text-lg italic">" {message?.message} "</p>
            </div>
            <p className="text-lg font-medium">
              {message?.name}{" "}
              <span className="text-md text-gray-500 font-normal">
                sent this message from
              </span>{" "}
              {message?.street || (
                <span className="font text-rose-400">No street provided</span>
              )}
              ,{" "}
              {message?.city || (
                <span className="font text-rose-400">No city provided </span>
              )}
              <span className="text-md text-gray-500 font-normal"> at </span>
              {message?.createdAt?.split("T", 1)}
            </p>

            <div className="h-[2px] rounded bg-gray-200 w-full my-5"></div>

            <div className="flex justify-end gap-5">
              <button className="py-2 bg-indigo-600 text-white lg:w-40 px-2 rounded-md hover:bg-indigo-400 transition duration-300">
                {" "}
                Reply
              </button>
              <button className="py-2 bg-indigo-600 text-white lg:w-40 px-2 rounded-md hover:bg-indigo-400 transition duration-300">
                Mark as Resolved
              </button>
              <button
                onClick={() => {
                  setOpenModal(true);
                }}
                className="py-2 bg-rose-600 text-white cursor-pointer lg:w-40 px-2 rounded-md hover:bg-rose-400 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        }
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
                    handleDelete(message?._id);
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

export default SingleContactMessage;
