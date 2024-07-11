import React, { useContext, useRef, useState } from "react";
import "./navbar.scss";
import {
  IoSearchSharp,
  LuShoppingCart,
  profilePic,
  logo,
  menuLinks,
  BsBoxArrowInLeft,
} from "../../constants/index";
import OutsideClickHandler from "react-outside-click-handler";
import { motion } from "framer-motion";
import { menuVars } from "../../utils/motion";
import context from "../../context/context";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authAction";
import { getSearchedProducts } from "../../features/userActions/product/productAction";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isToggleCart, setIsToggleCart } = useContext(context);
  // select the cart state
  const cart = useSelector((select) => select.cart);

  // select user state
  const user = useSelector((select) => select.auth.userData);
  const token = useSelector((select) => select.auth.token);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const timeoutRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearchedProducts = () => {
    const fetchSearchResults = () => {
      dispatch(getSearchedProducts(token, inputRef.current.value));
    };

    // Use useRef to keep track of the timeout

    const debounceSearch = () => {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        if (inputRef.current.value) {
          fetchSearchResults();
        }
      }, 500); // Adjust the debounce time as needed
    };

    debounceSearch();
  };

  return (
    <div className="navbar">
      <div className="left">
        <img src={logo} alt="logo" />
      </div>
      <div className="mid">
        <div className="search-inp">
          <input
            type="text"
            placeholder="Search for products..."
            ref={inputRef}
            onChange={handleSearchedProducts}
          />
          <IoSearchSharp className="icon" onClick={handleSearchedProducts} />
        </div>
      </div>

      <div className="right">
        <div
          className="cart-div"
          onClick={() => setIsToggleCart(!isToggleCart)}
        >
          <LuShoppingCart className="icon" />
          <span className="items-count">
            {cart.itemsCount > 0 && cart.itemsCount}
          </span>
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
                <img
                  src={`${
                    import.meta.env.VITE_API_BASE_IMAGE_URI
                  }/assets/images/users/${user.avatar}`}
                  alt=""
                />
                <p>{user.username}</p>
                <ul>
                  {menuLinks.map((link) => (
                    <Link className="Link" to={link.link}>
                      <motion.li>
                        <link.icon className="icon" /> {link.id}
                      </motion.li>
                    </Link>
                  ))}
                  <li onClick={handleLogout}>
                    <BsBoxArrowInLeft className="icon" /> Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
}
