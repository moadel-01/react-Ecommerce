import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footCont">
      <div className="upper">
        <div className="elements">
          <Link to={"/"}>
            <img src={`/finalFooterLogo.png`} className="footLogo" />
          </Link>
          <h5>
            Our Shop offers a wide range of products from electronics and
            fashion to home goods and groceries. Shop easily, pay securely, and
            enjoy fast delivery. Convenience starts here.
          </h5>
        </div>

        {/* <div class="fasel"></div> */}

        <div className="elements">
          <h1>Useful Links</h1>
          {/* <Link to={"/about"}> */}
            <h4>About US</h4>
          {/* </Link> */}
          <Link to={'/contact'}>
            <h4>Contact Us</h4>
          </Link>
          <a href="https://maps.app.goo.gl/WGSnzrpLRAWKsVwC6" target="_blank">
            <h4>Our Location</h4>
          </a>
        </div>

        {/* <div class="fasel"></div> */}

        <div className="elements">
          <h1>Categories</h1>
          <h4>Men</h4>
          <h4>Women</h4>
          <h4>Groceries</h4>
        </div>

        {/* <div class="fasel"></div> */}

        <div className="elements">
          <h1>My Account</h1>
          <h4>My Account</h4>
          <Link to={"/SignIn"}>
            <h4>Login</h4>
          </Link>
          <Link to={"/SignUp"}>
            <h4>Sign Up</h4>
          </Link>
          <Link to={"/Cart"}>
            <h4>Cart</h4>
          </Link>
        </div>

        {/* <div class="fasel"></div> */}

        <div className="elements">
          <h1>Contact Info</h1>
          <div className="flex items-center space-x-2">
            <img src={`/location.png`} /> 
            <h4>Hosary Square, 6th of October</h4>
          </div>
          <div className="flex items-center space-x-2">
            <img src={`/mail.png`} /> 
            <h4>DailyBuy@example.com</h4>
          </div>
          <div className="flex items-center space-x-2">
            <img src={`/call.png`} /> 
            <h4>01234567890</h4>
          </div>
        </div>
      </div>
      {/* <div className="line"></div> */}
      <div className="lower">
        <div className="Social">
            <div><a href="https://mail.google.com/" target="_blank"><img src={`/gmail.png`} /></a></div>
            <div><a href="https://www.facebook.com/" target="_blank"><img src={`/facebook.png`} /></a></div>
            <div><a href="https://www.instagram.com/" target="_blank"><img src={`/insta.png`} /></a></div>
            <div><a href="https://web.whatsapp.com/" target="_blank"><img src={`/whatsapp.png`} /></a></div>
            <div><a href="https://x.com/" target="_blank"><img src={`/x.png`} /></a></div>
        </div>
        <div className="littleLine"></div>
        <div className="flex items-center space-x-2" id="rights">
            <img src={`/TR.png`} /> 
            <h6>All Rights Reserved by Eng.Mohamed Adel</h6>
        </div>
      </div>
    </div>
  );
}

export default Footer;
