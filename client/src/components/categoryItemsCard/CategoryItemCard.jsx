import React from "react";
import "./categoryItemsCard.scss";
import { allFoodImage } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/userActions/product/productAction";

export default function CategoryItemCard({
  id,
  imgSrc,
  itemName,
  activeSlide,
  setActiveSlide,
  categoryId,
}) {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const dispatch = useDispatch();

  const handleOnClick = (id, categoryId) => {
    const authToken = token || localStorage.getItem("token");
    if (authToken) {
      itemName === "All"
        ? dispatch(getProducts(authToken))
        : dispatch(getProducts(authToken, categoryId));
      setActiveSlide(id);
    }
  };
  return (
    <div
      className="categoryItemCard"
      onClick={() => handleOnClick(id, categoryId)}
    >
      <img
        src={`${
          import.meta.env.VITE_API_BASE_IMAGE_URI
        }/assets/images/${imgSrc}`}
        alt="All"
        loading="lazy"
      />
      <p>{itemName}</p>
      <div
        className={`curr-sel ${activeSlide === id ? "" : "hide-curr-sel"} `}
      />
    </div>
  );
}
