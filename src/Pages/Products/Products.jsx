import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import Card from "../../Components/Card/Card";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState(null);
  async function getProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/products",
        method: "GET",
      };
      let data = await axios.request(options);
      setProducts(data.data.data);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <section>
        {products === null ? (
          <Loading />
        ) : (
          <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <Card className="w-full" productInfo={product} key={product.id} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
