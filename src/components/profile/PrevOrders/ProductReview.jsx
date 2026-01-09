import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";

function ProductReview() {
  const { prod_id } = useParams();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(
        `https://express-ecommerce-kappa.vercel.app/products/${prod_id}`
      )
      .then((res) => {
        console.log("product details", res);
        setProduct(res.data.data);
        // console.log(product);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [prod_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const Data = { comment, rating: Number(rating) };

    api
      .post(
        `https://express-ecommerce-kappa.vercel.app/products/${prod_id}/reviews`,
        Data,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        setMessage(res.data.message);
      })
      .catch((res) => {
        console.log("erorr hereee", res);
        setLoading(false);
        setError(res.response.data.message);
      });
  };
  return (
    <div className="min-h-fit xl:px-50">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-50 hover:bg-gray-200 shadow-sm cursor-pointer border border-gray-200 px-4 py-2 mb-5 rounded-lg text-lg font-medium flex"
      >
        <img className="h-4 self-center mr-2" src="/back.png" />
        Back to Order
      </button>
      <p className="text-4xl font-medium mb-2">How was this product?</p>

      <div className="grid w-full bg-gray-50 mt-5 rounded-lg border border-gray-200 md:p-8 p-4  justify-items-center">
        <div className="flex gap-5 md:w-3/5  mb-5">
          <div className="bg-amber-30 w-fit border-gray-200">
            <img className="max-h-60" src={product?.thumbnail} />
          </div>
          <div className="bg-green-30 w-full self-center">
            <p className="text-xl font-medium">{product?.title}</p>
            <p className="text-gray-600 text-lg font-medium ">
              ${product?.price}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className=" bg-sky-30 md:w-3/5 w-full ">
          <label className="block text-sm/6 font-medium text-gray-900">
            Write your Review
          </label>
          <div className="mt-2">
            <textarea
              id="comment"
              name="comment"
              type="text"
              value={comment}
              required
              onChange={(e) => setComment(e.target.value)}
              className="block w-full h-60 sm:h-fit resize-none whitespace-pre-wrap rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="rating"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Rating (1 to 5)
            </label>
            <div className="mt-2 flex justify-between mb-5">
              <input
                id="rating"
                name="rating"
                type="number"
                value={rating}
                min={1}
                max={5}
                required
                onChange={(e) => setRating(e.target.value)}
                className="block w-1/5 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              <button
                type="submit"
                className={` text-white w-35 py-2 rounded-lg ${
                  loading
                    ? "bg-indigo-300"
                    : "bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
                }`}
              >
                {loading ? "..." : "Submit Review"}
              </button>
            </div>
          </div>
          {message && (
            <p className="text-indigo-600 text-xl text-center">{message}</p>
          )}
          {error && (
            <p className="text-rose-500 text-xl text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProductReview;
