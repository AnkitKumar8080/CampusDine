import React, { useState } from "react";
import "./login.scss";
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
export default function Login() {
  const [hidePass, setHidePass] = useState(true);

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="reg-wrap-left">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <h1>Login</h1>
          <form className="login-form">
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
                Dont't have an account?{" "}
                <Link to={"/register"}>
                  <span>Sign Up</span>
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
