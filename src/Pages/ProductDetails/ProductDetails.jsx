import { useContext, useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import Card from "../../Components/Card/Card";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [releatedProducts, setRelatedProducts] = useState(null);
  let { id } = useParams();
  const { addProductToCart } = useContext(CartContext);

  async function getProductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: `GET`,
      };
      let { data } = await axios.request(options);
      setProductDetails(data.data);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }

  async function getRelatedProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
        method: `GET`,
      };
      let { data } = await axios.request(options);
      setRelatedProducts(data.data);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");

    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetails === null) return;
    getRelatedProducts();
  }, [productDetails]);

  return (
    <>
      {productDetails ? (
        <>
          <section className="grid grid-cols-12 gap-7">
            <div className="col-span-3">
              <img src={productDetails.imageCover} alt={productDetails.title} className="w-full" />
            </div>
            <div className="col-span-9 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-600">
                  {productDetails.title}
                </h2>
                <h3 className="text-primary-600">
                  {productDetails.category.name}
                </h3>
              </div>
              <p className="text-gray-400 ">{productDetails.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">
                  {productDetails.price} L.E
                </span>
                <div>
                  <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
                  <span>{productDetails.ratingsAverage}</span>
                </div>
              </div>
              <button
                onClick={() => addProductToCart(id)}
                className="btn bg-primary-500 hover:bg-primary-600 text-white font-semibold w-full"
              >
                Add to Cart
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-slate-700 font-semibold my-2">
              Related Products :
            </h2>
            {releatedProducts ? (
              <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {releatedProducts.map((product) => (
                  <Card
                    className="w-full"
                    productInfo={product}
                    key={product.id}
                  />
                ))}
              </div>
            ) : (
              <Loading></Loading>
            )}
          </section>
        </>
      ) : (
        <Loading> </Loading>
      )}
    </>
  );
}
