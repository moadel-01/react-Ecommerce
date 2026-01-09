import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Pages.css";
import api from "../../../api/axios";

function Fragrances() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    api
      .get(`https://express-ecommerce-kappa.vercel.app/products/categories/fragrances`)
      .then((res) => setProducts(res.data.data.products))
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="pageCont">
      <div className="pageCategory">
        <p className="categoryTitle">Fragrances</p>
        <p className="categoryPara">
          Discover our collection of fragrances, featuring refreshing scents for
          every mood and occasion—crafted to leave a lasting impression.
        </p>
      </div>

      <div className="categoryPrdc">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((el) => (
                <a key={el._id} className="group">
                  <Link to={`${el._id}`}>
                    <img
                      src={el.thumbnail}
                      className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
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
      </div>
    </div>
  );
}

export default Fragrances;
