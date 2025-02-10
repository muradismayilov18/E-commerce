import React from "react";

const ForgotPassword = () => {
  return (
    <section
      className="bg-gradient-to-r from-indigo-900 to-indigo-600 h-screen flex items-center justify-center"
    >
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center">
          <img
            className="w-16 h-16 mx-auto mb-6"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Forgot your password?
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            No worries, just type in your email and we will send you a code to reset your password!
          </p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-2 p-4 text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="name@company.com"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
