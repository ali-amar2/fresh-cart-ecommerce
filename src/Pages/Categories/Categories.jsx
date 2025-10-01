import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/categories",
        method: "GET",
      };
      let data = await axios.request(options);
      setCategories(data.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <section className="p-4">
        {categories === null ? (
          <Loading />
        ) : (
          <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {categories.map((category) => (
              <div
                key={category._id}
                className="border rounded-lg shadow p-2 text-center"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-40 object-fill rounded"
                />
                <h3 className="text-primary-500 my-3 text-lg font-semibold">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
