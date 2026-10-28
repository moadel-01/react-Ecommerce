import React from "react";
import "./AdminPanel.css";
import { Link, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AdminPanel() {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;

  return (
    <div>
      {decodedToken?.role !== "ADMIN" ? (
        <>
          <div className="min-h-screen grid gap-9 justify-items-center place-content-center">
            {/* <img src="./notADMIN.png" className="h-"/> */}
            <img
              className="md:h-90 h-60"
              src="https://img.icons8.com/plumpy/384/film-noir.png"
              alt="film-noir"
            />

            <div className="text-center grid gap-3">
              <p className="md:text-5xl text-2xl font-bold">
                Curious, aren't we?
              </p>
              <p className="md:text-2xl font-semibold">
                Unfortunately, this page is for admins only.
              </p>
            </div>

            <Link
              to={"/"}
              className="cursor-pointer rounded-md px-5 py-1.5 text-xl font-semibold bg-[#000000] hover:bg-[#000000ac] text-white shadow-sm focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Back to Home page
            </Link>
          </div>
        </>
      ) : (
        <div className="admin-page">
          <div className="panel">
            <div className="panelCard">
              <Link to={"users"}>
                <div className="img-title">
                  <img src="/users.png" />
                  <h4 className="cardTit">Users</h4>
                </div>
              </Link>
            </div>

            <div className="panelCard">
              <Link to={"messages"}>
                <div className="img-title">
                  <img src="/messages.png" />
                  <h4 className="cardTitm">Contact Us Messages</h4>
                  <h4 className="cardTit2">Messages</h4>
                </div>
              </Link>
            </div>

            <div className="panelCard">
              <Link to={"products"}>
                <div className="img-title">
                  <img src="/products.png" />
                  <h4 className="cardTit">Products</h4>
                </div>
              </Link>
            </div>

            <div className="panelCard">
              <Link to={"orders"}>
                <div className="img-title">
                  <img src="/orders.png" />
                  <h4 className="cardTit">Orders</h4>
                </div>
              </Link>
            </div>
          </div>

          <div className="adminContent">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
