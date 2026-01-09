import React from "react";
import "../Users/User.css"
import { Link, Outlet } from "react-router-dom";

function Product() {
  return (
    <div className="u-page">
      <div className="u-panel">
        <div className="u-cards">
          <Link to={"productConfig"}>
            <div className="u-img-title">
                <img src="/editprod.png" />
                <h4 className="u-cardTit">Products Configration</h4>
                <h4 className="u-cardTit2">Configration</h4>
            </div>
          </Link>
        </div>

        <div className="u-cards">
          <Link to={"productCreation"}>
            <div className="u-img-title">
                <img src="/addprod.png" />
                <h4 className="u-cardTit">Create New Product</h4>
                <h4 className="u-cardTit2">Create</h4>
            </div>
          </Link>
        </div>
      </div>

      <div className="u-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Product;
