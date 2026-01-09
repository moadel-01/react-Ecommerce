import React, { useEffect, useState } from "react";
import "../Users/User.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import api from "../../../api/axios";

function ProductConfig() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [productID, setProductID] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  // const { y } = useParams();

  useEffect(() => {
    setLoading(false);
    allProducts();
  }, []);
  const allProducts = async () => {
    await api.get(`/products?limit=2000`)
      .then((res) => {
        console.log("response here", res.data.data.products);
        setProducts(res.data.data.products);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    api
      .delete(
        `https://express-ecommerce-kappa.vercel.app/products/${id}`,
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

  return (
    <div className="grid min-h-fit ">
      <div className="h-fit mb-5">
        <p className="mt-5 mb-1 mx-auto  text-center text-4xl  font-semibold tracking-tight text-balance text-gray-950 ">
          Products Configration
        </p>
        <h2 className="text-center mb-5 text-lg font-semibold text-indigo-600">
          Edit, Delete and Preview Products Here.
        </h2>
      </div>
      <div className="h-fit sm:w-1/2 w-full justify-self-center mb-10">
        <form onSubmit={handleSearch} className="grid gap-5">
          <div className="w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, Title or Category"
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
      <div className="gap-5 p-2 grid xl:grid-cols-4 md:grid-cols-3 ">
        {products.length === 0 && search && (
          <p className="text-gray-500 mt-4 text-3xl col-span-4 text-center">
            No products found for "{search}"
          </p>
        )}
        {products.map((item) => (
          <div
            key={item._id}
            className="rounded-lg bg-gray-100 border border-gray-300 shadow-sm"
          >
            <div className="h-fit mb-3">
              <img className="h-fit p-5" src={item.thumbnail} />
              <h3 className="text-xl text-center">
                {item.title.length > 30
                  ? item.title.slice(0, 25) + "..."
                  : item.title}
              </h3>
              <h6 className="text-sm text-gray-500 text-center">
                {item.category}
              </h6>
            </div>
            <div className="confProdBtns">
              <Link
                to={`EditProd/${item._id}`}
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
                    setOpenModal(true), setProductID(item._id);
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
                        You're about to permanently delete this Product.
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
                    handleDelete(productID);
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

export default ProductConfig;
