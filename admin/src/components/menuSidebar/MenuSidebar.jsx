import { useDispatch } from "react-redux";
import {
  BiAddToQueue,
  FaRegRectangleList,
  GrContactInfo,
  PiArchiveBox,
  profilePic,
} from "../../constants/index";
import "./menuSidebar.scss";
import React from "react";
import { logout } from "../../features/auth/authAction";

export default function MenuSidebar({ selectedMenu, setSelectedMenu }) {
  console.log(selectedMenu);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="menu-sidebar">
      <div className="img-div">
        <img src={profilePic} alt="" />
      </div>
      <ul className="menu-options">
        <li
          className={`${selectedMenu === 1 ? "li-active" : ""}`}
          onClick={() => setSelectedMenu(1)}
        >
          <PiArchiveBox className="icon" />
        </li>
        <li
          className={`${selectedMenu === 2 ? "li-active" : ""}`}
          onClick={() => setSelectedMenu(2)}
        >
          <BiAddToQueue className="icon" />
        </li>
        <li
          className={`${selectedMenu === 3 ? "li-active" : ""}`}
          onClick={() => setSelectedMenu(3)}
        >
          <GrContactInfo className="icon" />
        </li>
        <li
          className={`${selectedMenu === 4 ? "li-active" : ""}`}
          onClick={() => setSelectedMenu(4)}
        >
          <FaRegRectangleList className="icon" />
        </li>
      </ul>
      <div className="bottom">
        <p onClick={handleLogout}>Logout</p>
      </div>
    </div>
  );
}
