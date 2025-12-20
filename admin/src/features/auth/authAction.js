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
    // Handle case where server is not responding (error.response is undefined)
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || "An error occurred";
      
      // Provide user-friendly error messages based on status code
      let userFriendlyMessage = errorMessage;
      
      if (statusCode === 404) {
        userFriendlyMessage = "Email not found. Please check your email address and try again.";
      } else if (statusCode === 401) {
        userFriendlyMessage = "Invalid password. Please check your password and try again.";
      } else if (statusCode === 400) {
        userFriendlyMessage = errorMessage || "Please provide both email and password.";
      } else if (statusCode === 422) {
        // Validation errors
        const validationErrors = error.response.data?.errors;
        if (validationErrors && Array.isArray(validationErrors) && validationErrors.length > 0) {
          userFriendlyMessage = validationErrors[0].msg || "Invalid input. Please check your credentials.";
        } else {
          userFriendlyMessage = "Invalid input. Please check your email and password.";
        }
      }
      
      dispatch(signInFailure({ message: userFriendlyMessage }));
    } else if (error.request) {
      // Network error or server not responding
      dispatch(signInFailure({
        message: "Cannot connect to server. Please make sure the API server is running on port 5000."
      }));
    } else {
      // Something else happened
      dispatch(signInFailure({
        message: error.message || "An unexpected error occurred. Please try again."
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
