import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function ExpiredTokenModal({ setOpenModal }) {
  const navigate = useNavigate();
  return (
    <div>
      <Dialog open={true} onClose={() => {}} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-rose-500"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Session Expired
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your session has expired. Please log in again.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 grid gap-3 sm:gap-0 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 sm:ml-3 sm:w-25 cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setOpenModal(false);
                    navigate("/SignIn");
                    window.location.reload();
                  }}
                >
                  Log in
                </button>
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-white border border-gray-200 py-2 text-sm font-medium text-indigo-500 shadow-sm hover:bg-gray-100 sm:ml-3 sm:w-25 cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setOpenModal(false);
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  Go Home
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ExpiredTokenModal;
