import React, { useContext, useEffect, useState } from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import CategoriesCarousel from "../../components/categoriesCarousel/CategoriesCarousel";
import { motion } from "framer-motion";
import { fadeIn, menuVars, slideIn } from "../../utils/motion";
import FoodItemCard from "../../components/foodItemsCard/FoodItemCard";
import { foodItems } from "../../constants";
import CartItems from "../../components/cartItems/CartItems";
import context from "../../context/context";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/userActions/product/productAction";

export default function Home() {
  const { isToggleCart, setIsToggleCart } = useContext(context);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const product = useSelector((state) => state.product);

  // fetch all the products when component is mounted (no token required)
  useEffect(() => {
    const authToken = token || localStorage.getItem("token");
    dispatch(getProducts(authToken));
  }, [dispatch, token]);
  
  // Auto-refresh products every 10 seconds to show new products
  useEffect(() => {
    const authToken = token || localStorage.getItem("token");
    const refreshInterval = setInterval(() => {
      dispatch(getProducts(authToken));
    }, 10000); // Refresh every 10 seconds
    
    return () => clearInterval(refreshInterval);
  }, [dispatch, token]);
  
  // Refresh when page gains focus (user switches back to tab)
  useEffect(() => {
    const authToken = token || localStorage.getItem("token");
    const handleFocus = () => {
      dispatch(getProducts(authToken));
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [dispatch, token]);

  return (
    <div className="home">
      <OutsideClickHandler
        onOutsideClick={() => isToggleCart && setIsToggleCart(false)}
      >
        <Navbar />
        {isToggleCart && (
          <motion.div
            className="cart"
            variants={menuVars}
            initial="initial"
            animate="animate"
          >
            <CartItems />
          </motion.div>
        )}
      </OutsideClickHandler>

      <div className="home-wrapper">
        <motion.div
          variants={fadeIn("down", "spring", 0.1, 2)}
          initial="hidden"
          animate="show"
          className="category-div"
        >
          <CategoriesCarousel />
        </motion.div>

        <motion.div
          variants={slideIn("left", "spring", 0.1, 3)}
          initial="hidden"
          animate="show"
        >
          <h1 className="category-name">Items</h1>
        </motion.div>
        <div className="food-items-wrapper">
          {product.isLoading ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '2em', 
              color: 'rgba(255, 255, 255, 0.7)',
              gridColumn: '1 / -1'
            }}>
              Loading products...
            </div>
          ) : product.products && product.products.length > 0 ? (
            product.products.map((item) => (
              <FoodItemCard
                key={item.productId}
                name={item.productName}
                desc={item.description}
                price={item.price}
                rating={item.rating}
                image={item.image}
                item={item}
              />
            ))
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '2em', 
              color: 'rgba(255, 255, 255, 0.5)',
              gridColumn: '1 / -1',
              fontStyle: 'italic'
            }}>
              {product.error ? `Error: ${product.error}` : 'No products available. Check back later!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
