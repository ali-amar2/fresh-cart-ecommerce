import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";

export default function Card({ productInfo }) {
  const {
    imageCover,
    title,
    price,
    category,
    description,
    ratingsAverage,
    id,
  } = productInfo;
  let { addProductToCart } = useContext(CartContext);
  return (
    <>
      <div className="card rounded-lg overflow-hidden shadow-lg">
        <div className="relative">
          <img src={imageCover} alt={title} loading="lazy" />
          <div className="layer gap-4 flex items-center justify-center absolute w-full h-full bg-slate-200 left-0 top-0 bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
            <div className="icon w-10 h-10 rounded-full bg-primary-500 text-white flex justify-center items-center">
              <i className="fa-solid fa-heart cursor-pointer"></i>
            </div>

            <div
              onClick={() => {
                addProductToCart(id);
              }}
              className="icon w-10 h-10 rounded-full bg-primary-500 text-white flex justify-center items-center"
            >
              <i className="fa-solid fa-cart-shopping cursor-pointer"></i>
            </div>

            <Link
              to={`/product/${id}`}
              className="icon w-10 h-10 rounded-full bg-primary-500 text-white flex justify-center items-center"
            >
              <i className="fa-solid fa-eye cursor-pointer"></i>
            </Link>
          </div>
        </div>
        <div className="card-body p-4 space-y-2">
          <header className="space-y-1">
            <h3 className="text-xl font-semibold text-primary-700 line-clamp-1">
              {title}
            </h3>
            <h4 className="text-sm text-slate-900 font-bold">
              {category.name}
            </h4>
          </header>
          <p className="text-slate-500 line-clamp-4">{description}</p>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-700">{price} L.E</span>
            <div>
              <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
