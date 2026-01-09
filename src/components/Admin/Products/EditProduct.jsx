import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../../../api/axios";

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  // const [error, setError] = useState(false);
  const [title, setTitle] = useState("Loading...");
  const [category, setCategory] = useState("Loading...");
  const [description, setDescription] = useState("Loading...");
  const [price, setPrice] = useState("Loading...");
  const [stock, setStock] = useState("Loading...");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const { y } = useParams();

  useEffect(() => {
    api
      .get(`https://express-ecommerce-kappa.vercel.app/products/${y}`)
      .then((res) => {
        console.log(res.data.data.images[0]);
        setProduct(res.data.data);
      })
      .catch((error) => console.log(error));
  }, [y]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setCategory(product.category);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const updatedData = { title, category, description, price, stock };

    api
      .patch(
        `https://express-ecommerce-kappa.vercel.app/products/${y}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log("Response here", res.data.message);
        setLoading(false);
        setMessage(res.data.message);
      })
      .catch((res) => {
        console.log("Error Here", res);
        setLoading(false);
        setMessage(res.response.data.message);
      });
  };

  return (
    <div className="w-full p-5 h-fit">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 text-center">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Product Edit
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Edit what you need to update in this product{" "}
              <span className="underline text-rose-500">
                Filling all branches is NOT required!
              </span>
            </p>

            <div className="mt-15 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 text-sta">
              <div className="sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Product title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    // placeholder={`${product.title}`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <input
                    id="category"
                    name="category"
                    type="text"
                    // placeholder={`${product.category}`}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    // placeholder={`${product.description}`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    // rows={5}
                    className="block w-full resize-none h-60 sm:h-fit whitespace-pre-wrap rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 sm:col-start-1">
                <label
                  htmlFor="price"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    // placeholder={`${product.price}`}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="stock"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    // placeholder={`${product.stock}`}
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {message && <p className="text-indigo-600 text-xl">{message}</p>}

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            id="saveBtn"
            type="submit"
            className={`rounded-md w-full px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
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

export default EditProduct;
