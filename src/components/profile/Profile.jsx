import React from "react";
import "./Profile.css";
import { Link, Outlet } from "react-router-dom";

function Profile() {
  return (
    <div className="page">
      <div className="aside"></div>

      <div className="profileContainer">
        <div className="bar">
          <div className="box">
            <Link to="">
              <div className="option">
                <img src="/account2.png" />{" "}
                <h4 className="opTit">User Information</h4>
              </div>
            </Link>
          </div>

          <div className="box">
            <Link to="edit">
              <div className="option">
                <img src="/edit2.png" />{" "}
                <h4 className="opTit">Edit Your Profile</h4>
              </div>
            </Link>
          </div>

          <div className="box">
            <Link to="prevOrders/:order_id">
              <div className="option">
                <img src="/prevOreders2.png" />
                <h4 className="opTit">Previous Orders</h4>
              </div>
            </Link>
          </div>
          <div className="box">
            <Link to="prevOrders/:order_id/review/:prod_id">
              <div className="option">
                <img src="/prevOreders2.png" />
                <h4 className="opTit">Previous Orders Review</h4>
              </div>
            </Link>
          </div>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>

      <div className="aside"></div>
    </div>
  );
}

export default Profile;
