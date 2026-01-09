import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import "./SingleProduct.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../../api/axios";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [closing, setClosing] = useState(false);
  const { x } = useParams();

  useEffect(() => {
    api
      .get(`https://express-ecommerce-kappa.vercel.app/products/${x}`)
      .then((res) => {
        // console.log(res.data);
        setProduct(res.data.data);
        setReviews(res.data.reviews);
        console.log(reviews);
      })
      .catch((res) => {
        console.log(res);
        setError(res.response.data.message);
      });
  }, [x]);

  if (!product) {
    return (
      <div className="text-center text-4xl p-10 h-screen content-center">
        {error}
      </div>
    );
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // setOpenModal(true);

    // setOpenModal(true);

    // setTimeout(() => {
    //   setOpenModal(false);
    // }, 1000);

    setOpenModal(true);
    setClosing(false);

    setTimeout(() => {
      setClosing(true);
      setTimeout(() => {
        setOpenModal(false);
      }, 350);
    }, 1000);
  };

  const sliderSettings = {
    customPaging: (i) => (
      <img
        src={product.images[i]}
        className="h-15 w-15 gap-40 object-cover rounded border"
      />
    ),
    arrows: false,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: product.images.length > 1,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="SPCont">
      <div className="SProduct">
        <div className="prodImg">
          {/* <img src={product.thumbnail} alt="Product Img" /> */}

          {product.images?.length ? (
            <Slider {...sliderSettings}>
              {product.images.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    alt="Product"
                    // className="w-full h-[400px] object-cover rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img src={product.thumbnail} alt="Product Img" />
          )}
        </div>
        <div className="sm:p-10 p-5 content-center  w-screen sm:w-fit ">
          <p className="xl:text-4xl lg:text-3xl text-2xl font-bold mb-3">
            {product.title}
          </p>
          <p className="xl:text-4xl lg:text-3xl text-2xl mb-3">
            ${product.price}
          </p>
          <div className={` ${reviews.length === 0 ? "hidden" : "flex mb-10"}`}>
            <img src="/rate2.png" className="h-5 self-center mr-2 " />
            <p className="inline text-lg font-semibold text-gray-500">
              {product.rating} out of 5
            </p>
            <span className="mx-2 mt-1 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400 self-center" />
            <a href="#prodReviews" className="text-lg font-semibold text-gray-500 hover:underline hover:text-gray-600 cursor-pointer">
              {reviews.length} reviews ↓
            </a>
          </div>
          <p className="lg:text-xl  text-justify lg:pr-20  mb-4">
            {product.description}
          </p>

          <p className="text-lg text-indigo-600 font-medium lg:mb-16 mb-5">
            {product.stock}{" "}
            <span className="text-gray-500 text-sm">in Stock</span>
          </p>

          <button
            className="bg-indigo-600 text-xl text-white font-medium md:py-3 py-2 w-35 md:w-60 rounded-md cursor-pointer hover:bg-indigo-500"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>

      <div
        id="prodReviews"
        className="h-[1px] rounded w-full my-20"
      ></div>

      <div>
        {reviews.length === 0 ? (
          <div></div>
        ) : (
          <div className="lg:mx-45 md:mx-20 mx-5 grid gap-5 bg-gray-50 rounded-lg my-10 border border-gray-200 p-8">
            <p className="text-3xl font-medium mb-5">Customer Reviews</p>
            {reviews.map((item) => (
              <div
                key={item._id}
                className="flex gap-5 items-start border-b-2 last:border-b-0 border-gray-200"
              >
                <div className="bg-indigo-200 h-fit p-3 shrink-0 rounded-full md:mt-1 mt-2">
                  <img src="/account.png" className="md:h-6 h-5" />
                </div>
                <div className=" w-full">
                  <p className="text-lg font-medium">{item.reviewer.username}</p>
                  <p className="text-gray-500 font-medium mb-4">{item.createdAt.split("T", 1)}</p>
                  <div className="flex mb-4">
                    <img src="/rate2.png" className="h-5 self-center mr-2 " />
                    <p className="inline text-base font-semibold text-gray-500">
                      {item.rating} out of 5
                    </p>
                  </div>
                  <p className="mb-5 font-medium ">{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={openModal} onClose={setOpenModal} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-transparent" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="fixed top-20 right-10 flex p-4 text-right">
            <DialogPanel
              className={`relative transform overflow-hidden border-1 border-solid border-indigo-500 rounded-lg bg-white text-left shadow-xl w-100
        ${closing ? "animate-slideOut" : "animate-slideIn"}`}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:size-10">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 text-indigo-500"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Product added to cart
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        You successfully added{" "}
                        <strong className="text-indigo-500">
                          {product.title}
                        </strong>{" "}
                        to your cart.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-600 sm:ml-3 sm:w-auto cursor-pointer"
                >
                  OK
                </button>
              </div> */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SingleProduct;
