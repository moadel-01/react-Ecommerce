import React from "react";

function UserPlaceholder() {
  return (
    <div className="min-h-screen">
      <p className="md:mt-10 mb-3 mx-auto  text-center md:text-4xl text-xl  font-semibold tracking-tight text-balance text-gray-950 ">
        Welcome to the User Management Panel
      </p>
      <h2 className="text-center  text-sm/7 font-semibold text-indigo-600">
        Here you can add new users, update existing ones, manage roles, and
        availability,<br className="hidden md:inline "></br> make sure all
        information is accurate before saving changes.
      </h2>
    </div>
  );
}

export default UserPlaceholder;
