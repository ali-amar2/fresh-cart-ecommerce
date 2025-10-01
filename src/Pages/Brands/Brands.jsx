import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import toast from "react-hot-toast";

export default function Brands() {
  const [brands, setBrands] = useState(null);

  async function getBrands() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/brands",
        method: "GET",
      };
      let data = await axios.request(options);
      setBrands(data.data.data);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <section className="p-4">
        {brands === null ? (
          <Loading />
        ) : (
          <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="border rounded-lg shadow p-2 text-center"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-40 object-fill rounded"
                />
                <h3 className="text-primary-500 my-3 text-lg font-semibold">
                  {brand.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
