import React from "react";
import "./User.css"
import { Link, Outlet } from "react-router-dom";

function User() {
  return (
    <div className="u-page">
      <div className="u-panel">
        <div className="u-cards">
          <Link to={"userConfig"}>
            <div className="u-img-title">
                <img src="/edit.png" />
                <h4 className="u-cardTit">Users Configration</h4>
                <h4 className="u-cardTit2">Configration</h4>
            </div>
          </Link>
        </div>

        <div className="u-cards">
          <Link to={"userCreation"}>
            <div className="u-img-title">
                <img src="/adduser.png" />
                <h4 className="u-cardTit">Create New Account</h4>
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

export default User;
