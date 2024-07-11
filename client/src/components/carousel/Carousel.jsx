import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "./carousel.scss";
import "swiper/css";

export default function Carousel({ images }) {
  const carouselConfig = {
    modules: [Autoplay],
    loop: true,
    speed: 2000,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    spaceBetween: 0,
    slidesPerView: 1,
  };

  return (
    <div className="carousel">
      <Swiper {...carouselConfig} className="swiper-1">
        {images.map((img) => (
          <SwiperSlide className="swiper-slide-1">
            <img src={img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
