import React, { useState } from "react";
import "./register.scss";
import {
  backgroundImg1,
  backgroundImg2,
  backgroundImg3,
  backgroundImg4,
  logo,
  FaEye,
  FaEyeSlash,
} from "../../constants/index.js";
import Carousel from "../../components/carousel/Carousel.jsx";
import { Link } from "react-router-dom";
export default function Register() {
  const [hidePass, setHidePass] = useState(true);

  return (
    <div className="register">
      <div className="register-wrapper">
        <div className="reg-wrap-left">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <h1>Register</h1>
          <form className="register-form">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Enter username" />

            <label htmlFor="username">Email</label>
            <input type="email" placeholder="Enter Email" />

            <label htmlFor="password">Password</label>
            <div className="pass-div">
              <input
                type={`${hidePass ? "password" : "text"}`}
                placeholder="Enter you password"
              />
              {hidePass ? (
                <FaEyeSlash
                  className="icon"
                  onClick={() => setHidePass(!hidePass)}
                />
              ) : (
                <FaEye
                  className="icon"
                  onClick={() => setHidePass(!hidePass)}
                />
              )}
            </div>
            <button className="button">Sign Up</button>

            <div className="left-bottom">
              <p>or</p>
              <p>
                Already have an account?{" "}
                <Link to={"/login"}>
                  <span>Sign In</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="reg-wrap-right">
          <Carousel
            images={[
              backgroundImg1,
              backgroundImg2,
              backgroundImg3,
              backgroundImg4,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
