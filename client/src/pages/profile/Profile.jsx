import React, { useRef, useState } from "react";
import "./profile.scss";
import { FaEye, FaEyeSlash, BiImageAdd } from "../../constants";
import Navbar from "../../components/navbar/Navbar";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserDetails,
  updateUserProfile,
} from "../../features/auth/authAction";
export default function Profile() {
  const [hidePass, setHidePass] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [updatedDetails, setUpdatedDetails] = useState(false);

  const usernameRef = useRef();
  const emailRef = useRef();
  const oldPassRef = useRef();
  const newPassRef = useRef();

  // select token from state
  const token = useSelector((state) => state.auth.token);

  // select user state
  const user = useSelector((select) => select.auth.userData);
  const dispatch = useDispatch();

  const handleUpdateUserProfile = () => {
    // e.preventDefault();
    dispatch(updateUserProfile(imageFile, token));
    setImageFile(null);
  };

  const handleUpdateUserDetails = () => {
    const credential = {
      // username: usernameRef.current.value || null,
      // email: emailRef.current.value || null,
      // oldPassword: oldPassRef.current.value || null,
      // newPassRef: newPassRef.current.value || null,
    };

    if (usernameRef.current.value) {
      credential.username = usernameRef.current.value;
    }

    if (emailRef.current.value) {
      credential.email = emailRef.current.value;
    }

    if (oldPassRef.current.value && newPassRef.current.value) {
      credential.oldPassword = oldPassRef.current.value;
      credential.newPassword = newPassRef.current.value;
    }

    if (Object.keys(credential).length > 0) {
      dispatch(updateUserDetails(credential, token));
      setUpdatedDetails(true);
      setTimeout(() => {
        setUpdatedDetails(false);
      }, 10 * 1000);
    }
  };

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-wrapper">
        <div className="profile-mid-div">
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/gif, image/svg, image/webp"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="fileInput"
            id="fileInput"
          />
          <label className="fileLabel" htmlFor="fileInput">
            <img
              src={`${
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : // : process.env.REACT_APP_IMAGES_URL + "/" + user.userData.avatar
                    `${
                      import.meta.env.VITE_API_BASE_IMAGE_URI
                    }/assets/images/users/${user.avatar}`
              }`}
            />
            <span className="w-mark-add-img">
              <BiImageAdd />
            </span>
          </label>
          {imageFile && (
            <motion.button
              className="upd-img"
              whileTap={{ scale: 0.95 }}
              onClick={handleUpdateUserProfile}
            >
              update image
            </motion.button>
          )}
        </div>
        <div className="profile-details">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            placeholder={user.username}
            ref={usernameRef}
          />
          <label htmlFor="email">Email</label>
          <input type="email" placeholder={user.email} ref={emailRef} />
          <div className="pass-label">
            <label htmlFor="password">Update password</label>
          </div>
          <input
            type={`${hidePass ? "password" : "text"}`}
            placeholder="Enter your old password"
            ref={oldPassRef}
          />
          <div className="pass-input">
            <input
              type={`${hidePass ? "password" : "text"}`}
              placeholder="Enter your new password"
              ref={newPassRef}
            />
            {hidePass ? (
              <FaEyeSlash
                className="icon"
                onClick={() => setHidePass(!hidePass)}
              />
            ) : (
              <FaEye className="icon" onClick={() => setHidePass(!hidePass)} />
            )}
          </div>
          <motion.button
            onClick={handleUpdateUserDetails}
            whileTap={{ scale: 0.95 }}
          >
            Update
          </motion.button>
        </div>
      </div>
    </div>
  );
}
