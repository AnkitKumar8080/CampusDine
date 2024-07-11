import axios from "axios";
import {
  deleteUserError,
  deleteUserSuccess,
  getUsersFailure,
  getUsersSuccess,
  usersRequest,
} from "./usersSlice";

const getAllUsers = (token) => async (dispatch) => {
  try {
    dispatch(usersRequest());

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URI}/admin/get-all-users`,
      config
    );

    console.log(res.data);

    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(getUsersFailure());
  }
};

const deleteUser = (token, userId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URI}/admin/user/${userId}`,
      config
    );

    if (res.data.success) {
      dispatch(deleteUserSuccess());
      dispatch(getAllUsers(token));
    }
  } catch (error) {
    console.log(error);
    dispatch(deleteUserError(error.response.message));
  }
};

export { getAllUsers, deleteUser };
