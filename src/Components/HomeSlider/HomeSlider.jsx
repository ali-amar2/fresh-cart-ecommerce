import sliderImage1 from "../../assets/images/slider-image-1.webp";
import sliderImage2 from "../../assets/images/slider-image-2.webp";
import sliderImage3 from "../../assets/images/slider-image-3.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";

export default function HomeSlider() {
    return (
        <section className="grid grid-cols-12 mb-4">
            <div className="col-span-8">
                <Swiper spaceBetween={10} slidesPerView={1} loop={true}>
                    <SwiperSlide>
                        <img className="w-full" src={sliderImage1} alt="Fresh grocery bag filled with tomatoes, pineapple, carrots, and oranges" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="w-full h-full object-cover" src={sliderImage3} alt="Pack of rich chocolate powder for baking and drinks" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="w-full h-full object-cover" src={sliderImage2} alt="Delicious cream filled water rolls fresh from the bakery" />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="col-span-4">
                <img className="w-full" src={sliderImage3} alt="Pack of rich chocolate powder for baking and drinks" />
                <img className="w-full" src={sliderImage2} alt="Delicious cream filled water rolls fresh from the bakery" />

            </div>
        </section>
    );
}