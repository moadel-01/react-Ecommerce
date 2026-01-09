import React from "react";
import "./AdminPanel.css"
import { Link, Outlet } from "react-router-dom";

function AdminPanel() {
  return (
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
  );
}

export default AdminPanel;
