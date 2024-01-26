import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./categoriesCarousel.scss";

// import required modules
import { Pagination, Navigation, HashNavigation } from "swiper/modules";
import CategoryItemCard from "../categoryItemsCard/CategoryItemCard";
import { categoryItems } from "../../constants/index";

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <Swiper
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 24,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 32,
            slidesPerGroup: 1,
          },
          1336: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
          // 1600: {
          //   slidesPerView: 8,
          //   spaceBetween: 38,
          // },
        }}
        // spaceBetween={55}
        hashNavigation={{
          watchState: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, HashNavigation]}
        className="swiper2"
      >
        {categoryItems.map((item, index) => (
          <SwiperSlide className="swiper-slide">
            <CategoryItemCard
              id={index}
              imgSrc={item.image}
              itemName={item.id}
              activeSlide={activeSlide}
              setActiveSlide={setActiveSlide}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
