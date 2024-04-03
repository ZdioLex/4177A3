import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login-registration.css";
import newBoyImage from "../img/newBoy.webp";
import girlImage from "../img/img_Marni3.webp";
import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";
import { registrationValidation } from "../lib/utils";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { registerNewUser } from "../services/authServices";

export default function SignUpPage() {
  const navigate = useNavigate();

  const redirect = (event) => {
    event.preventDefault();
    navigate("/login"); // path defined for the LoginPage in routerr
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, confirmPassword, fname, lname } = data;

    if (password !== confirmPassword) {
      alert("The password does not match the confirmation.");
      return;
    }

    const result = await registerNewUser(email, password, fname, lname);
    if (result.success) {
      console.log("User created with name:", result.user.displayName);
      navigate(`/${result.user.uid}`);
    } else {
      console.error("Error creating user:", result.error);
      alert("Error creating user: " + result.error.message);
    }
  };

  const validationRules = registrationValidation(watch);

  return (
    <>
      <NavBar />
      <div className="flex grow justify-center items-center py-4 lg:px-52 bg-purp-900">
        <div className="boy-img hidden lg:block">
          {/* See citation [4] for newBoy.webp in README file */}
          <img src={newBoyImage} alt="boy" />
        </div>

        <div className="girl-img hidden lg:block">
          {/* See citation [5] for img_Marni.webp in README file */}
          <img src={girlImage} alt="girl" />
        </div>

        <div className="signup-container">
          <h1>Welcome</h1>
          <form onSubmit={handleSubmit(onSubmit)} id="signup-form">
            <div className="half-width-input">
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                {...register("fname", validationRules.fname)}
              />
              <input
                type="text"
                name="lname"
                placeholder="Last Name"
                {...register("lname", validationRules.lname)}
              />
            </div>
            <div className="flex mb-3 items-center">
              {(errors.fname || errors.lname) && (
                <>
                  <ExclamationTriangleIcon className="stroke-red-500 w-7 pr-1" />
                  <p className="text-sm font-bold text-red-500">
                    {errors.fname.message}
                  </p>
                </>
              )}
            </div>
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
                  <p className="text-sm font-bold text-red-500">
                    {errors.password.message}
                  </p>
                </>
              )}
            </div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              {...register("confirmPassword", validationRules.confirmPassword)}
            />
            <div className="flex mb-3 items-center">
              {errors.confirmPassword && (
                <>
                  <ExclamationTriangleIcon className="stroke-red-500 w-7 pr-1" />
                  <p className="text-sm font-bold text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                </>
              )}
            </div>
            <button type="submit">SignUp</button>
          </form>

          <div className="login-link">
            Already have an account?{" "}
            <a href="#" onClick={redirect}>
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
