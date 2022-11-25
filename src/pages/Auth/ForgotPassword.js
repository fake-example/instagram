import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import Login from "./Login";
import { LOGIN } from "../../constants/routes";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // alert("Password reset email sent!");
      })
      .catch((error) => {
        setError(`${error.code} ${error.message}`);
      });
  };

  const isInvalid = email.trim() === "";

  return (
    <div className="bg-white h-screen w-screen flex flex-wrap items-center justify-center p-3">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className="w-[350px] grid gap-y-3">
        <div className="bg-white border px-[40px] pt-10 pb-6">
          <div className="flex justify-center mb-8">
            <img
              className="h-[51px]"
              src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png"
              alt=""
            />
          </div>

          <p className="text-[17px] font-semibold text-[#8e8e8e] text-center mb-6">
            Reset password
          </p>

          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="" method="post">
            <div>
              <input
                type="text"
                aria-label="Enter your email address"
                placeholder="Enter Your Email"
                className="text-xs p-3 mb-3 border-[1px] border-gray-300 rounded bg-white w-full outline-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-500 text-sm mt-3 cursor-pointer text-white rounded-md w-full h-8 font-medium ${
                  isInvalid && "opacity-50"
                }`}
              >
                Reset Password
              </button>
            </div>

            <div class="flex items-center my-2.5 mb-3.5 mt-3.5">
              <div class="h-px bg-gray-300 flex-1"></div>
              <span class="px-4 text-[13px] text-gray-500 font-semibold">
                OR
              </span>
              <div class="h-px bg-gray-300 flex-1"></div>
            </div>

            <div className="flex justify-center items-center flex-col w-full bg-white">
              <p className="text-sm">
                <Link
                  to={LOGIN}
                  className="font-semibold text-brand text-blue-500"
                >
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
