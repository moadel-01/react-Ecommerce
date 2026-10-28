import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import api from "../../api/axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SignUp.css";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [role, setRole] = useState("USER");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const calculateAge = (date) => {
    const today = new Date();
    const birth = new Date(`${date}T00:00:00`);

    let age = today.getFullYear() - birth.getFullYear();

    const monthDifference = today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDay() < birth.getDay())
    ) {
      age--;
    }

    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const age = calculateAge(birthDate);

    if (age < 18) {
      setError("you are too young for this, stay away kid.");
      setLoading(false);
      return;
    }

    const userData = {
      email,
      username,
      password,
      birthDate,
      role,
      gender,
      phoneNumber,
    };

    api
      .post("https://express-ecommerce-kappa.vercel.app/users/signUp", userData)
      .then((res) => {
        console.log(res.data.data);
        const token = res.data.data.token;
        localStorage.setItem("token", token);
        setError("");
        setOpenModal(true);
        setLoading(false);
      })
      .catch((res) => {
        console.log(res.response.data.message);
        setLoading(false);
        setError(res.response.data.message);
      });
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
    autoplaySpeed: 4000,
    pauseOnHover: false,
  };

  return (
    <div className="relative mt-10 xl:py-11 py-10 xl:min-h-screen md:bg-[#8c52ff22] ">
      <img
        src="/doodle.png"
        className="absolute -z-10 bottom-0 right-0 -scale-x-100 -scale-y-100 opacity-70 hidden md:inline"
      />
      <img
        src="/doodle.png"
        className="absolute -z-10 top-0 -left-10  opacity-70 hidden md:inline"
      />

      <div className="grid md:grid-cols-2 xl:mx-50 lg:mx-20 md:mx-5 rounded-3xl overflow-hidden bg-white md:shadow-2xl z-50">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 xl:py-11 md:py-4 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to={"/"}>
              <img
                alt="Your Company"
                src={`/newDailyBuy.png`}
                className="mx-auto h-25 w-auto"
              />
            </Link>
            <h2 className="mt-5 xl:text-2xl text-xl font-semibold tracking-tight text-gray-900">
              Create Your Account
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit}
              className="xl:space-y-4 space-y-3 md:font-medium font-normal"
            >
              <div>
                <label htmlFor="email" className="block text-sm text-gray-900">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="abc@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm text-gray-900"
                  >
                    Gender
                  </label>
                  <div className="mt-1 grid">
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option disabled selected hidden></option>
                      <option value={"Male"}>Male</option>
                      <option value={"Female "}>Female</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm text-gray-900"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      autoComplete="username"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm text-gray-900">
                    Birth Date
                  </label>
                  <div className="mt-1">
                    <input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      required
                      max={new Date().toLocaleDateString("en-EG")}
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      autoComplete="off"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm md:font-medium font-normal text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1 mb-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="">
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Age
                  </label>
                  <div className="mt-1">
                    <input
                      id="age"
                      name="age"
                      type="number"
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      autoComplete="off"
                      className="block w-1/2 rounded-md bg-white px-3 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
              </div> */}

              {error && <p className="text-rose-500 text-sm">{error}</p>}

              <div>
                <button
                  type="submit"
                  className={`flex w-full justify-center cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    loading
                      ? "bg-indigo-300 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500 transition duration-300"
                  }`}
                >
                  {loading ? "Loading..." : "Create Account"}
                </button>
              </div>
            </form>

            <p className="mt-5 text-center text-sm text-gray-500">
              Already a member?{" "}
              <Link
                to={"/SignIn"}
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition duration-300"
              >
                Sign In
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

      {/* ✅ Modal Dialog */}
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
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="size-6 text-indigo-500"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Account Created
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your account has been successfully registered.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 sm:ml-3 sm:w-auto cursor-pointer"
                  onClick={() => {
                    setOpenModal(false);
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  OK
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default SignUp;
