import axios from "axios";
import Card from "../../Components/Card/Card";
import Loading from "../../Components/Loading/Loading";
import { useEffect } from "react";
import { useState } from "react";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import CategorySlider from "../../Components/categorySlider/categorySlider";

export default function Home() {
  const [products, setProducts] = useState(null);
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setProducts(data.data);
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <HomeSlider />
      <CategorySlider />
      {!products ? (
        <Loading />
      ) : (
        <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <Card productInfo={product} key={product.id} />
          ))}
        </div>
      )}
    </>
  );
}
