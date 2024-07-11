import React, { useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../features/auth/authAction.js";
export default function Register() {
  const [hidePass, setHidePass] = useState(true);
  const auth = useSelector((select) => select.auth);

  const dispatch = useDispatch();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const handleRegister = (e) => {
    e.preventDefault();

    dispatch(
      signUp(
        usernameRef.current.value,
        emailRef.current.value,
        passRef.current.value
      )
    );
  };

  return (
    <div className="register">
      <div className="register-wrapper">
        <div className="reg-wrap-left">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <h1>Register</h1>
          <form onSubmit={handleRegister} className="register-form">
            <p className="error-message">{auth.error && auth.error}</p>

            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Enter username" ref={usernameRef} />

            <label htmlFor="username">Email</label>
            <input type="email" placeholder="Enter Email" ref={emailRef} />

            <label htmlFor="password">Password</label>
            <div className="pass-div">
              <input
                type={`${hidePass ? "password" : "text"}`}
                placeholder="Enter you password"
                ref={passRef}
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
            <button type="submit" className="button">
              Sign Up
            </button>

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
