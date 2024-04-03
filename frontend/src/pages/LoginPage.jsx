import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/login-registration.css";
import newBoyImage from "../img/newBoy.webp";
import girlImage from "../img/img_Marni3.webp";
import NavBar from "../components/NavBar";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { loginUser } from "../services/authServices";
import { loginValidation } from "../lib/utils";

export default function LoginPage() {
  // Hook for navigation
  const navigate = useNavigate();

  // Function to handle registration link click
  const redirect = (event) => {
    event.preventDefault();
    navigate("/registration"); // path defined for the HomePage in router
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await loginUser(data.email, data.password);
    if (result.success) {
      navigate(`/${result.user.uid}`);
    } else {
      console.error(result.error);
    }
  };

  const validationRules = loginValidation();

  return (
    <>
      <NavBar />
      <div className="flex grow justify-center items-center py-4 lg:px-52 bg-purp-900">
        {/* <h1 id="appName">SplitEase</h1> */}
        <div className="boy-img hidden lg:block">
          {/* cite */}
          <img src={newBoyImage} alt="boy" />
        </div>

        <div className="girl-img hidden lg:block">
          {/* cite */}
          <img src={girlImage} alt="girl" />
        </div>

        <div className="signup-container">
          <h1>Welcome</h1>
          <form onSubmit={handleSubmit(onSubmit)} id="signup-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...register("email", validationRules.email)}
            />
            <div className="flex mb-3 items-center">
              {errors.email && (
                <>
                  <ExclamationTriangleIcon className="stroke-red-500 w-7 pr-1" />
                  <p className="text-sm font-bold text-red-500">
                    {errors.email.message}
                  </p>
                </>
              )}
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...register("password", validationRules.password)}
            />
            <div className="flex mb-3 items-center">
              {errors.password && (
                <>
                  <ExclamationTriangleIcon className="stroke-red-500 w-7 pr-1" />
                  <p className="text-sm font-bold text-red-500">
                    {errors.password.message}
                  </p>
                </>
              )}
            </div>
            <button type="submit">Login</button>
          </form>

          <div className="login-link">
            Don't have an account?{" "}
            <a href="#" onClick={redirect}>
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
