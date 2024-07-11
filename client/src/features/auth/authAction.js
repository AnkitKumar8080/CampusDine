import axios from "axios";
import {
  logOut,
  signInFailure,
  signInRequest,
  signInSuccess,
  signUpFailure,
  signUpRequest,
  signUpSuccess,
  updateUserAvatar,
  updateUserInfo,
} from "./authSlice";
import { apiClient } from "../../../apiClient";

const signIn = (email, password) => async (dispatch) => {
  try {
    dispatch(signInRequest());

    // const res = await apiClient.post("/users/login", { email, password });

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URI}/users/login`,
      { email, password }
    );

    // saving token in local storage
    if (res.data.data) {
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      localStorage.setItem("token", res.data.data.accessToken);
      dispatch(signInSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(signInFailure(error.response.data));
    // console.log(error);
  }
};

const signUp = (username, email, password) => async (dispatch) => {
  try {
    dispatch(signUpRequest());

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URI}/users/register`,
      { username, email, password }
    );

    if (res.data.data) {
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      localStorage.setItem("token", res.data.data.accessToken);
      dispatch(signUpSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(signUpFailure(error.response.data));
  }
};

const logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  dispatch(logOut());
};

const updateUserProfile = (file, token) => async (dispatch) => {
  try {
    const config1 = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const config2 = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "Application/json",
      },
    };

    if (file) {
      const data = new FormData();

      data.append("file", file);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URI}/users/upload-profile`,
        data,
        config1
      );

      if (res) {
        await axios.patch(
          `${import.meta.env.VITE_API_BASE_URI}/users/updateuser`,
          {
            avatar: file.name.replace(/\s+/g, "_"),
          },
          config2
        );
      }

      dispatch(updateUserAvatar(file.name.replace(/\s+/g, "_")));
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUserDetails = (credentials, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "Application/json",
      },
    };

    const res = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URI}/users/updateuser`,
      credentials,
      config
    );

    dispatch(updateUserInfo(res.data.data));
  } catch (error) {
    console.log(error);
  }
};

export { signIn, signUp, updateUserProfile, logout, updateUserDetails };
