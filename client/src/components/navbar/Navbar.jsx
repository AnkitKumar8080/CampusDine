import React, { useContext, useState } from "react";
import "./navbar.scss";
import {
  IoSearchSharp,
  LuShoppingCart,
  profilePic,
  logo,
  menuLinks,
} from "../../constants/index";
import OutsideClickHandler from "react-outside-click-handler";
import { motion } from "framer-motion";
import { menuVars } from "../../utils/motion";
import context from "../../context/context";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isToggleCart, setIsToggleCart } = useContext(context);

  return (
    <div className="navbar">
      <div className="left">
        <img src={logo} alt="logo" />
      </div>
      <div className="mid">
        <div className="search-inp">
          <input type="text" placeholder="Search for products..." />
          <IoSearchSharp className="icon" />
        </div>
      </div>

      <div className="right">
        <div
          className="cart-div"
          onClick={() => setIsToggleCart(!isToggleCart)}
        >
          <LuShoppingCart className="icon" />
          <span className="items-count">8</span>
        </div>
        <OutsideClickHandler onOutsideClick={() => setToggleMenu(false)}>
          <div
            className={`menu-div ${toggleMenu ? "ham-open" : ""}`}
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            {/* <IoMenu className="icon" /> */}
            <div className="ham-line " />

            {toggleMenu && (
              <motion.div
                variants={menuVars}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`menu-tray ${!toggleMenu ? "hide-tray" : ""}`}
              >
                <img src={profilePic} alt="" />
                <p>The Kiet</p>
                <ul>
                  {menuLinks.map((link) => (
                    <Link className="Link" to={link.link}>
                      <motion.li>
                        <link.icon className="icon" /> {link.id}
                      </motion.li>
                    </Link>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
}
