import React, { useState } from "react";
import "./userList.scss";
import { profilePic } from "../../assets";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineEdit,
  MdDeleteOutline,
  IoCheckmarkSharp,
  RxCross2,
  usersList,
} from "../../constants";
import { searchValueInArrObj } from "../../utils/helper";
import { useEffect } from "react";
import { deleteUser, getAllUsers } from "../../features/users/usersAction";

const UserListChild = ({ user }) => {
  const [toggleEditMode, setToggleEditMode] = useState(false);
  const [imgFile, setImgFile] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUpdateUser = () => {
    setToggleEditMode(false);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(token, userId));
  };

  return (
    <div className="user-list-child">
      {/* <div className="user-id">
        <p>{user.userId}</p>
      </div> */}
      <div className="user-name-avatar">
        <img
          src={imgFile ? URL.createObjectURL(imgFile) : profilePic}
          alt={user.username}
        />
        <input type="text" value={user.username} disabled={!toggleEditMode} />
      </div>

      <div className="user-email">
        <input type="email" value={user.email} disabled={!toggleEditMode} />
      </div>

      <div className="user-role">
        <p>{user.role}</p>
      </div>

      <div className="user-update">
        {user.role !== "admin" && (
          <MdDeleteOutline
            onClick={() => handleDeleteUser(user.userId)}
            className="icon"
          />
        )}
      </div>
    </div>
  );
};

export default function UserList() {
  const { users } = useSelector((state) => state.users);
  const [userList, setUserList] = useState(users || null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      const filteredUserList = searchValueInArrObj(users, event.target.value);

      setUserList(filteredUserList);
    }

    if (event.target.value.trim() === "") {
      setUserList(users);
    }
  };

  const checkIfInputEmpty = (event) => {
    if (event.target.value.trim() === "") {
      setUserList(users);
    }
  };

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, [token]);

  return (
    <div className="user-list">
      <div className="head">
        <p>Users</p>
        <input
          type="text"
          placeholder="search user by fields..."
          onKeyDown={handleInputKeyDown}
          onChange={checkIfInputEmpty}
        />
      </div>
      <div className="user-list-wrapper">
        {/* <ul className="list-header">
          <li>User Id</li>
          <li>User Name</li>
          <li>User Email</li>
          <li>User Role</li>
          <li>Update User</li>
        </ul> */}
        {users &&
          users?.map((user, index) => (
            <UserListChild key={index} user={user} />
          ))}
      </div>
    </div>
  );
}
