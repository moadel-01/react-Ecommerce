import React, { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import api from "../../api/axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../signUp/SignUp.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // const storedUser = JSON.parse(localStorage.getItem("user"))

    // if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
    //   setError("Invalid email or password")
    //   return
    // }
    setLoading(true);

    const userInfo = { email, password };

    api
      .post("https://express-ecommerce-kappa.vercel.app/users/signIn", userInfo)
      .then((res) => {
        console.log(res.data.data);
        const token = res.data.data.token;
        localStorage.setItem("token", token);
        setError("");
        setLoading(false);
        setShowModal(true);
      })
      .catch((res) => {
        console.log(res.response.data.message);
        setLoading(false);
        setError(res.response.data.message);
      });

    // localStorage.setItem("isLoggedIn", "true");
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/");
    window.location.reload();
  };

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };

  return (
    <div className="relative min-h-screen mt-10 md:py-15 xl:min-h-screen md:bg-[#8c52ff22]">
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto self-center flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CheckCircleIcon
                        className="h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Login Successful
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          You have successfully signed in. You will now be
                          redirected to the homepage.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto cursor-pointer"
                      onClick={closeModal}
                    >
                      OK
                    </button>
                  </div>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <img
        src="/doodle.png"
        className="absolute -z-10 bottom-0 -right-0 -scale-100 opacity-70 hidden md:inline"
      />
      <img
        src="/doodle.png"
        className="absolute -z-10 top-0 -left-10 opacity-70 hidden md:inline"
      />

      <div className="grid md:grid-cols-2 xl:mx-50 lg:mx-20 md:mx-5 rounded-3xl overflow-hidden bg-white md:shadow-2xl z-50">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to={"/"}>
              <img
                alt="Your Company"
                src={`/newDailyBuy.png`}
                className="mx-auto h-25 w-auto"
              />
            </Link>
            <p className="text-center mt-5 text-3xl font-semibold">
              Welcome back!
            </p>
            <h2 className=" text-center lg:text-xl text-lg font-medium tracking-tight text-gray-900">
              We're glad to see you again.
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              {error && <p className="text-rose-500 text-sm">{error}</p>}

              <div>
                <button
                  type="submit"
                  className={`flex w-full justify-center cursor-pointer rounded-md px-3 py-1.5 text-sm/6 font-medium text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    loading
                      ? "bg-indigo-300 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500 transition duration-300"
                  }`}
                >
                  {loading ? "Loading..." : "Sign In"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{" "}
              <Link
                to={"/SignUp"}
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition duration-300"
              >
                Join Us Now!!
              </Link>
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-4 overflow-hidden rounded-2xl">
            <Slider className="h-full" {...settings}>
              <div className="h-full">
                <img
                  src={`/clothes.png`}
                  alt="Slide 1"
                  className="h-full w-full object-cover object-right"
                />
              </div>

              <div className="h-full">
                <img
                  src={`/appleProd.png`}
                  alt="Slide 2"
                  className="h-full w-full object-cover object-left"
                />
              </div>

              <div className="h-full">
                <img
                  src={`/decorationpng.png`}
                  alt="Slide 3"
                  className="h-full w-full object-cover object-bottom"
                />
              </div>

              <div className="h-full">
                <img
                  src={`/watches.png`}
                  alt="Slide 3"
                  className="h-full w-full object-cover object-left"
                />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
