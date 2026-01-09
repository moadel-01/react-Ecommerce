import React, { useEffect, useState } from "react";
import "./User.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import api from "../../../api/axios";

function UserConfig() {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [userID, setUserID] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  // console.log(token);

  useEffect(() => {
    setLoading(false);
    allUsers();
  }, []);

  const allUsers = async () => {
    await api
      .get(`https://express-ecommerce-kappa.vercel.app/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("all users", res);
        setUsers(res.data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    api
      .delete(
        `https://express-ecommerce-kappa.vercel.app/users/${id}`,
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

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUsers([]);

    if (!search) {
      setLoading(false);
      allUsers();
      return;
    }

    await api
      .get(`https://express-ecommerce-kappa.vercel.app/users/search`, {
        params: { search },
      })
      .then((res) => {
        console.log("Search", res);
        setUsers(res.data.data.users);
        setLoading(false);
      })
      .catch((res) => {
        console.log(res);
        setLoading(false);
      });
  };

  const handleClear = () => {
    setLoading(true);
    setUsers([]);
    setSearch("");
    allUsers();
  };

  return (
    <div className="grid min-h-fit">
      <div className="h-fit mb-5">
        <p className="mt-5 mb-1 mx-auto  text-center text-4xl  font-semibold tracking-tight text-balance text-gray-950 ">
          Users Configration
        </p>
        <h2 className="text-center mb-5 text-lg font-semibold text-indigo-600">
          Edit, Delete and Preview Users Here.
        </h2>
      </div>
      <div className="h-fit sm:w-1/2 w-full justify-self-center mb-10">
        <form onSubmit={handleSearch} className="grid gap-5">
          <div className="w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, Email or Username"
              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div className="flex gap-2 justify-center">
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
          </div>
        </form>
      </div>
      <div className="gap-4 p-2 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.length === 0 && search && (
          <p className="text-gray-500 mt-4 text-3xl col-span-4 text-center">
            No user found for "{search}"
          </p>
        )}
        {users.map((item) => (
          <div
            key={item._id}
            className="rounded-lg bg-gray-100 border border-gray-300 shadow-md"
          >
            <div className="h-fit grid grid-cols-3">
              <img
                className="h-25 justify-self-center p-5 col-span-1"
                src="/account.png"
              />
              <div className="bg-green-30 col-span-2 content-center justify-items-start">
                <h3 className="text-xl">{item.username}</h3>
                <h6 className="text-sm text-gray-500">
                  {item.email.length > 23
                    ? item.email.slice(0, 20) + "..."
                    : item.email}
                </h6>
              </div>
            </div>
            <div className="confProdBtns">
              <Link
                to={`EditUser/${item._id}`}
                style={{ display: "block", width: "100%" }}
              >
                <div className="confProdEdit">Update</div>
              </Link>
              <Link
                to={`${item._id}`}
                style={{ display: "block", width: "100%" }}
              >
                <div className="confProdView">View</div>
              </Link>
              <Link style={{ display: "block", width: "100%" }}>
                <div
                  className="confProdDel"
                  onClick={() => {
                    setOpenModal(true), setUserID(item._id);
                  }}
                >
                  Delete
                </div>
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
                        You're about to permanently delete this User.
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
                    handleDelete(userID);
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

export default UserConfig;
