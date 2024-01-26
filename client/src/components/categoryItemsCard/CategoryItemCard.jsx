import React from "react";
import "./categoryItemsCard.scss";
import { allFoodImage } from "../../assets";

export default function CategoryItemCard({
  id,
  imgSrc,
  itemName,
  activeSlide,
  setActiveSlide,
}) {
  return (
    <div className="categoryItemCard" onClick={() => setActiveSlide(id)}>
      <img src={imgSrc} alt="All" />
      <p>{itemName}</p>
      <div
        className={`curr-sel ${activeSlide === id ? "" : "hide-curr-sel"} `}
      />
    </div>
  );
}
