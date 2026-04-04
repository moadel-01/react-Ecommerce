import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import "./ContactUs.css";
import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import api from "../../api/axios";

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("else");
  const [message, setMessage] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResponse("");
    setLoading(true);
    // alert("Thank you, your message has been sent successfully");
    // window.location.reload();

    const contactMessage = {
      name,
      email,
      subject,
      message,
      ...(city && { city }),
      ...(street && { street }),
    };

    api
      .post(
        "https://express-ecommerce-kappa.vercel.app/contact",
        contactMessage
      )
      .then((res) => {
        console.log(res);
        setResponse(res.data.message);
        setOpenModal(true);
        setLoading(false);
      })
      .catch((res) => {
        console.log("Error", res);
        setLoading(false);
        setError(res.response.data.message);
      });
  };

  return (
    <div className="CntctCont">
      <div className="cntctAside"></div>
      <div className="cntctForm">
        <div className="cntctCards">
          <div>
            <div>
              <img src="./location2.png" />
            </div>
            <div>
              <p className="cnctcPara">Hosary, 6th of October</p>
            </div>
          </div>
          <div>
            <div>
              <img src="./mail2.png" />
            </div>
            <div>
              <p className="cnctcPara">DailyBuy@example.com</p>
            </div>
          </div>
          <div>
            <div>
              <img src="./phone2.png" />
            </div>
            <div>
              <p className="cnctcPara">+201234567890</p>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Get in touch
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Have a question, feedback, or just want to say hello? We'd
                  love to hear from you! Fill out the form below or reach out
                  through our social channels — we're always here to help.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      What is your name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
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
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      You write this for?
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option value="" disabled selected hidden>
                          choose one
                        </option>
                        <option value={"technical"}>Technical issues</option>
                        <option value={"orders"}>
                          Orders & Shipping issues
                        </option>
                        <option value={"billing"}>Billing inquiries</option>
                        <option value={"else"}>Somthing else..</option>
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Explain your message
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="message"
                        name="message"
                        type="text"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="block w-full rounded-md bg-white h-30 resize-none px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="street"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Street
                    </label>
                    <div className="mt-2">
                      <input
                        id="street"
                        name="street"
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      id="postal-code"
                      name="postal-code"
                      type="text"
                      autoComplete="postal-code"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div> */}
                </div>
              </div>
            </div>

            {/* {response && (
              <p className="text-indigo-400 text-lg font-medium justify-self-center mt-5">{response}</p>
            )} */}

            {error && (
              <p className="text-rose-500 text-lg font-medium justify-self-center mt-5">
                {error}
              </p>
            )}

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold text-gray-900 border border-gray-300 w-30 py-2 rounded-md bg-gray-100 hover:bg-gray-200 shadow-xs cursor-pointer"
                onClick={() => window.location.reload()}
              >
                Reset form
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-indigo-100 w-30 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-indigo-200 border border-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </form>

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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 self-center items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
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
                          Message Sent successfully
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">{response}.</p>
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
      </div>
      <div className="cntctAside"></div>
    </div>
  );
}
