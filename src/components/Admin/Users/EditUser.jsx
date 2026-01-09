import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { jwtDecode } from "jwt-decode";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Prev } from "react-bootstrap/esm/PageItem";
import api from "../../../api/axios";

const EditUser = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const userData = jwtDecode(token);
  const navigate = useNavigate();
  const { user_id } = useParams();

  useEffect(() => {
    api
      .get(
        `https://express-ecommerce-kappa.vercel.app/users/${user_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        // console.log(res);
        // setUser(res.data.data);
        const { createdAt, _id, __v, updatedAt, ...Data } = res.data.data;
        setUser(Data);
        console.log("user data hereeeeee", user);
      })
      .catch((res) => console.log(res));
  }, []);

  const handleChange = (m) => {
    const { name, value } = m.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    // console.log(confirmPassword);

    // if (password && !confirmPassword) {
    //   setLoading(false);
    //   setMessage("Please Confirm your new Password");
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   setLoading(false);
    //   setMessage("Passwords do not match");
    //   return;
    // }

    // const updatedData = {
    //   ...user,
    //   ...(password && { password }),
    //   ...(oldPassword && { oldPassword }),
    // };

    api
      .patch(
        `https://express-ecommerce-kappa.vercel.app/users/${user_id}`,
        user,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log("Response here", res);
        setLoading(false);
        setMessage(res.data.message);
      })
      .catch((res) => {
        console.log("Error Here", res);
        setLoading(false);
        setMessage(res.response.data.message);
        setError(res.response.data.error);
        console.log(error);
      });
  };

  return (
    <div className="lg:p-10 md:p-5 min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-50 hover:bg-gray-200 shadow-sm cursor-pointer border border-gray-200 px-4 py-2 rounded-lg text-lg font-medium flex mb-10"
            >
              <img className="h-4 self-center mr-2" src="/back.png" />
              Back to Profile
            </button>
            <h2 className="text-base/7 justify-self-center font-semibold text-gray-900">
              Update Your Data
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600 justify-self-center">
              Edit what you need to update in this product{" "}
              <span className="underline text-rose-500">
                Filling all fields is NOT required!
              </span>
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={user?.email || ""}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={user?.username || ""}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 sm:col-start-1">
                <label
                  htmlFor="age"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Age
                </label>
                <div className="mt-2">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    value={user?.age || ""}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                {userData?.role === "ADMIN" ? (
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Role
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        id="role"
                        name="role"
                        onChange={handleChange}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option
                          value={user?.role}
                          disabled
                          selected
                          hidden
                        >{`choose one ( current role is ${user?.role} )`}</option>
                        <option value={"ADMIN"}>ADMIN</option>
                        <option value={"USER"}>USER</option>
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {message && (
          <p className="text-indigo-600 text-xl justify-self-center">
            {message}
          </p>
        )}

        {error && (
          <p className="text-rose-500 text-xl justify-self-center">{error}</p>
        )}

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            id="saveBtn"
            type="submit"
            className={`cursor-pointer rounded-md w-full px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
