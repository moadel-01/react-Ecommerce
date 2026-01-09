import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../../../api/axios";

const ProductCreation = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleThumbnail = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleImages = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("thumbnail", thumbnail);
    images.forEach((item) => {
      formData.append("images", item);
    });

    if (images.length > 5) {
      setMessage("You've selected more than 5 images, idiot.");
      setLoading(false);
      return;
    }

    api
      .post(
        "https://express-ecommerce-kappa.vercel.app/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("response Here", res);
        setLoading(false);
        setMessage(res.data.message);
      })
      .catch((res) => {
        console.log("error here", res);
        setLoading(false);
        setError(res.response.data.error);
        setMessage(res.response.data.message);
      });
  };

  return (
    <div className="mt-5 p-5">
      <form onSubmit={handleSubmit}>
        <div className="space-y-1">
          <div className="pb-8">
            <h2 className="text-base/7 font-semibold text-gray-900 text-center">
              Create New Product
            </h2>
            <p className=" text-sm/6 text-rose-500 text-center">
              Filling all branches is Required!
            </p>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                    className="block w-full h-60 sm:h-fit resize-none whitespace-pre-wrap rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
              <div className="sm:col-span-3 sm:col-start-1">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <input
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnail}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6
                    file:mr-4 file:rounded-md file:border-0 file:bg-indigo-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-200"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="stock"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Images{" "}
                  <span className=" text-rose-500">(Maximum 5 Images)</span>
                </label>
                <div className="mt-2">
                  <input
                    id="stock"
                    name="stock"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImages}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6
                    file:mr-4 file:rounded-md file:border-0 file:bg-indigo-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {message && <p className="text-indigo-600 text-xl text-center">{message}</p>}
        {error && <p className="text-indigo-600 text-xl text-center">{error}</p>}

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

export default ProductCreation;
