import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import api from "../../api/axios";
function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const paginationProducts = useRef(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    allProducts();
  }, [page, limit]);
  const allProducts = async () => {
    await api
      .get(
        `https://express-ecommerce-kappa.vercel.app/products?page=${page}&limit=${limit}`
      )
      .then((res) => {
        console.log("response here", res.data.data.products);
        setProducts(res.data.data.products);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    paginationProducts.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [page]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProducts([]);

    if (!search) {
      setLoading(false);
      allProducts();
      return;
    }

    await api
      .get(
        `https://express-ecommerce-kappa.vercel.app/products/search`,
        {
          params: { search },
        }
      )
      .then((res) => {
        console.log("Search", res);
        setProducts(res.data.data.products);
        setLoading(false);
      })
      .catch((res) => {
        console.log(res);
        setLoading(false);
      });
  };

  const handleClear = () => {
    setLoading(true);
    setProducts([]);
    setSearch("");
    allProducts();
  };

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    autoplaySpeed: 2500,
  };

  return (
    <>
      {/* <marquee
        direction="down"
        scrolldelay="200c"
        className="mt-16 h-10 bg-indigo-500 text-white text-xl text-center"
      >
        <p>New Collection Just Dropped</p>
        <p>Secure Checkout & Easy Returns</p>
        <p>Don't Miss Our Latest Deals</p>
        <p>Amazing quality and fast delivery</p>
      </marquee> */}
      <div className="container">
        <div className="homeAside"></div>
        <div className="homeCont">
          <div className="mb-10 flex justify-center" id="slidat">
            <div className="w-[88%]">
              <Slider {...settings}>
                <div id="homeSlider">
                  <Link to={"/Furniture"}>
                    <img
                      src={`/slider1.png`}
                      alt="Slide 1"
                      className="w-full "
                    />
                  </Link>
                </div>
                <div id="homeSlider">
                  <Link to={"/Fragrances"}>
                    <img
                      src={`/slider4.png`}
                      alt="Slide 2"
                      className="w-full"
                    />
                  </Link>
                </div>
                <div id="homeSlider">
                  <Link to={"/Jewellery"}>
                    <img
                      src={`/slider5.png`}
                      alt="Slide 3"
                      className="w-full"
                    />
                  </Link>
                </div>
                <div id="homeSlider">
                  <Link to={"/Decoration"}>
                    <img
                      src={`/slider6.png`}
                      alt="Slide 3"
                      className="w-full"
                    />
                  </Link>
                </div>
              </Slider>
            </div>
          </div>

          <div className="homeCards">
            <div className="sales">
              <Link to={"/Skincare"}>
                <img src={`/sales1.png`} />
              </Link>
            </div>
            <div className="sales">
              <Link to={"/Shirts"}>
                <img src={`/sales2.png`} />
              </Link>
            </div>
          </div>

          <div
            ref={paginationProducts}
            className="h-[1px] rounded w-full xl:mb-16 mb-5"
          ></div>

          <div className="h-fit lg:w-1/2 md:w-2/3  w-full justify-self-center xl:mt-30">
            <form onSubmit={handleSearch} className="grid gap-5">
              <div className="w-full">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="What are you looking for?"
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

          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Products</h2>

              <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 mx-5 min-h-120">
                {products.length === 0 && search && (
                  <div className="w-full col-span-5 content-center">
                    <p className="text-gray-500 mt-4 text-3xl text-center">
                      No products found for "{search}"
                    </p>
                  </div>
                )}

                {products.map((el) => (
                  <a key={el._id} className="group">
                    <Link to={`${el._id}`}>
                      <img
                        src={el.thumbnail}
                        className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75 xl:aspect-7/8"
                      />
                    </Link>

                    <h3 className="mt-4 text-sm text-gray-700">{el.title}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      ${el.price}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {search ? (
            <div></div>
          ) : (
            <div className="justify-self-center mt-20">
              <nav
                aria-label="Pagination"
                className=" isolate inline-flex -space-x-px rounded-md shadow-xs"
              >
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

                <button
                  onClick={() => {
                    setPage(1);
                  }}
                  className="rounded-s-lg relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:bg-indigo-600  focus:text-white text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  1
                </button>

                <button
                  onClick={() => {
                    setPage(2);
                  }}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:bg-indigo-600  focus:text-white text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  2
                </button>

                <button
                  onClick={() => {
                    setPage(3);
                  }}
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold focus:bg-indigo-600  focus:text-white text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  3
                </button>

                <button
                  onClick={() => {
                    setPage(4);
                  }}
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold focus:bg-indigo-600  focus:text-white text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  4
                </button>

                <button
                  onClick={() => {
                    setPage(5);
                  }}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:bg-indigo-600  focus:text-white text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  5
                </button>

                <button
                  onClick={() => {
                    setPage(6);
                  }}
                  className="rounded-e-lg relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:bg-indigo-600  focus:text-white text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  6
                </button>
              </nav>
            </div>
          )}
        </div>
        <div className="homeAside"></div>
      </div>
    </>
  );
}

export default Home;
