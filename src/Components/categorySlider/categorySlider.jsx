import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };

    let { data } = await axios.request(options);
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <section className="md:mb-5">
        <h2 className="text-xl font-semibold mt-2 text-gray-600">
          Shop popular Categories :
        </h2>
        {!categories ? (
          <Loading />
        ) : (
          <Swiper
            loop={true}
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className="mySwiper my-2"
          >
            {categories.map((category) => (
              <SwiperSlide key={category._id}>
                <div className=" h-64">
                  <img
                    className="w-full h-full object-fill md:object-cover"
                    src={category.image}
                    alt={category.name}
                  />
                </div>
                <h3 className="text-primary-500 font-semibold text-center mt-1">
                  {category.name}
                </h3>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </>
  );
}
