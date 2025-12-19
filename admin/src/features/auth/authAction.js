import axios from "axios";
import {
  logOut,
  signInFailure,
  signInRequest,
  signInSuccess,
} from "./authSlice";

const signIn = (email, password) => async (dispatch) => {
  try {
    dispatch(signInRequest());
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
    // Handle case where server is not responding (error.response is undefined)
    if (error.response) {
      dispatch(signInFailure(error.response.data));
    } else if (error.request) {
      // Network error or server not responding
      dispatch(signInFailure({
        message: "Cannot connect to server. Please make sure the API server is running on port 5000."
      }));
    } else {
      // Something else happened
      dispatch(signInFailure({
        message: error.message || "An unexpected error occurred"
      }));
    }
  }
};

const logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  dispatch(logOut());
};

export { signIn, logout };
