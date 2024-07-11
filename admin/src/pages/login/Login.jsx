import React, { useRef, useState } from "react";
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
// import Carousel from "../../components/carousel/Carousel.jsx";
import { useDispatch } from "react-redux";
import { signIn } from "../../features/auth/authAction.js";
export default function Login() {
  const [hidePass, setHidePass] = useState(true);
  const emailRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signIn(emailRef.current.value, passRef.current.value));
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="reg-wrap-left">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <h1>Admin Login</h1>
          <form onSubmit={handleSignIn} className="login-form">
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
              Sign In
            </button>
          </form>
        </div>

        {/* <div className="reg-wrap-right">
          <Carousel
            images={[
              backgroundImg1,
              backgroundImg2,
              backgroundImg3,
              backgroundImg4,
            ]}
          />
        </div> */}
      </div>
    </div>
  );
}
