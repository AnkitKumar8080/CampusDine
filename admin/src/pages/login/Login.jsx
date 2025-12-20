import React, { useRef, useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../features/auth/authAction.js";
import { signInFailure } from "../../features/auth/authSlice.js";

export default function Login() {
  const [hidePass, setHidePass] = useState(true);
  const [showError, setShowError] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();
  const { error, isLoading, loggedIn } = useSelector((state) => state.auth);

  // Show error notification when error occurs
  useEffect(() => {
    if (error) {
      setShowError(true);
      // Auto-hide error after 5 seconds
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      // Hide error when it's cleared (e.g., on successful login)
      setShowError(false);
    }
  }, [error]);

  // Hide error on successful login
  useEffect(() => {
    if (loggedIn) {
      setShowError(false);
    }
  }, [loggedIn]);

  // Clear error when user starts typing
  const handleInputChange = () => {
    if (showError && error) {
      setShowError(false);
      dispatch(signInFailure({ message: null }));
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passRef.current.value.trim();

    // Basic client-side validation
    if (!email) {
      dispatch(signInFailure({ message: "Please enter your email address" }));
      setShowError(true);
      return;
    }

    if (!password) {
      dispatch(signInFailure({ message: "Please enter your password" }));
      setShowError(true);
      return;
    }

    dispatch(signIn(email, password));
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="reg-wrap-left">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <h1>Admin Login</h1>
          {showError && error && (
            <div className="error-notification">
              <span className="error-icon">⚠️</span>
              <span className="error-message">{error}</span>
              <button
                className="error-close"
                onClick={() => {
                  setShowError(false);
                  dispatch(signInFailure({ message: null }));
                }}
              >
                ×
              </button>
            </div>
          )}
          <form onSubmit={handleSignIn} className="login-form">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              ref={emailRef}
              onChange={handleInputChange}
            />

            <label htmlFor="password">Password</label>
            <div className="pass-div">
              <input
                type={`${hidePass ? "password" : "text"}`}
                placeholder="Enter you password"
                ref={passRef}
                onChange={handleInputChange}
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
            <button
              type="submit"
              className="button"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
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
