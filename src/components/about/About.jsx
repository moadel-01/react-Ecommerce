import React from "react";
import "./About.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function About() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="abtCont">
      <div className="abtPara">
        <div className="paragraph">
          <div className="abtLogo">
            <img src="./abtLogo.png" />
          </div>
          <div>
            <p className="abtTitle">Everything You Need,</p>
            <p className="abtTitle">All in One Place</p>
            <p className="abtParagraph">
              Our eCommerce website offers a wide range of products — from
              electronics and fashion to home goods and groceries. Shop easily,
              pay securely, and enjoy fast delivery. Convenience starts here.
            </p>
          </div>
        </div>
        <div className="paraImg">
          <img src="./about.png" />
        </div>
      </div>

      <div className="choose">
        <p className="chooseTitle">Why Choose Us</p>
        <p className="choosePara">
          Everything in One Place: Save time by finding all your needs in one
          store,
        </p>
        <p className="choosePara">no more switching between websites.</p>
        <div className="chooseCards">
          <div>
            <img className="cardIcon" src="./shipping.png" />
            <p className="cardTitle">Fast & Secure Shipping</p>
            <p className="cardPara">
              We partner top carriers to ensure your order arrives quickly and
              safely.
            </p>
          </div>
          <div>
            <img className="cardIcon" src="./customer.png" />
            <p className="cardTitle">Customer Support</p>
            <p className="cardPara">
              Our team is always here to help, no matter the time or issue 24/7.
            </p>
          </div>
          <div>
            <img className="cardIcon" src="./comm.png" />
            <p className="cardTitle">Trusted by Thousands</p>
            <p className="cardPara">
              We've built a strong community of customers who love our service.
            </p>
          </div>
        </div>
      </div>

      <div className="team">
        <div>
          <p className="teamTitle">Our Team Members</p>
          <p className="teamPara">
            What started as a small passion project turned into a growing
            platform that serves customers across the country. We're proud of
            how far we've come,
          </p>
          <p className="teamPara">
            but more excited about where we're going. With continuous
            improvement and customer feedback, we're building the future of
            online retail.
          </p>
        </div>

        <div className="teamCards">
          <div>
            <div className="teamImg">
              <img src="./team1.png" />
            </div>
            <div className="info">
              <p className="teamName">Mohamed Adel</p>
              <p className="teamJob">CEO</p>
              <div className="socLink">
                <a href="https://www.linkedin.com/" target="_blank">
                  <img src="./linked.png" className="linked" />
                </a>
                <a href="https://x.com/" target="_blank">
                  <img src="./x2.png" className="linked" />
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="teamImg">
              <img src="./team2.png" />
            </div>
            <div className="info">
              <p className="teamName">Amr Mohamed</p>
              <p className="teamJob">Designer</p>
              <div className="socLink">
                <a href="https://www.linkedin.com/" target="_blank">
                  <img src="./linked.png" className="linked" />
                </a>
                <a href="https://x.com/" target="_blank">
                  <img src="./x2.png" className="linked" />
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="teamImg">
              <img src="./team3.png" />
            </div>
            <div className="info">
              <p className="teamName">Abdelrahman Mohamed</p>
              <p className="teamJob">Web Developer</p>
              <div className="socLink">
                <a href="https://www.linkedin.com/" target="_blank">
                  <img src="./linked.png" className="linked" />
                </a>
                <a href="https://x.com/" target="_blank">
                  <img src="./x2.png" className="linked" />
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="teamImg">
              <img src="./team4.png" />
            </div>
            <div className="info">
              <p className="teamName">Mostafa Refaat</p>
              <p className="teamJob">Software Engineer</p>
              <div className="socLink">
                <a href="https://www.linkedin.com/" target="_blank">
                  <img src="./linked.png" className="linked" />
                </a>
                <a href="https://x.com/" target="_blank">
                  <img src="./x2.png" className="linked" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="comments">
        <p className="commentsTitle">What Our Customers Say</p>
        <p className="commentsPara">
          At DailyBuy, customer satisfaction means everything to us. From fast
          delivery to reliable products,
        </p>
        <p className="commentsPara">
          shoppers trust us for a smooth and affordable experience.
        </p>
        <p className="commentsPara2">Their words say it best.</p>
        <div className="comSlider">
          <Slider {...settings}>
            <div>
              <p className="commenter">Amina H.</p>
              <p className="commentsPara">
                "DailyBuy is my go-to website. I always find what I need, and
                the delivery is super fast!"
              </p>
            </div>
            <div>
              <p className="commenter">Mohamed A.</p>
              <p className="commentsPara">
                "I bought a phone, kitchen tools, and clothes in one order — all
                perfect. Amazing variety."
              </p>
            </div>
            <div>
              <p className="commenter"> Laila M.</p>
              <p className="commentsPara">
                "Even when I had an issue with my order, their support solved it
                in minutes. Great service"
              </p>
            </div>
            <div>
              <p className="commenter">Omar K.</p>
              <p className="commentsPara">
                "I love how smooth the whole process is — from browsing to
                checkout. 10/10 experience."
              </p>
            </div>
            <div>
              <p className="commenter">Sara E.</p>
              <p className="commentsPara">
                "The prices are great, and the quality is better than expected.
                Highly recommend DailyBuy."
              </p>
            </div>
          </Slider>
        </div>
      </div>

      <div className="joinUs">
        <div className="toSignUp">
          <h1>Join to Our Community </h1>
          <Link to={"/SignUp"}>
            <h1 className="Now">Now!!</h1>
          </Link>
        </div>

        <div className="toLogin">
          <Link to={"/SignIn"}>
            <p>already a member?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
