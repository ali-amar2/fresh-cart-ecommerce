import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";

export default function CartItem({ productInfo }) {
  const { count, price, product } = productInfo;
  const { title, imageCover, category, id } = product;

  let { removeProductFromCart, updateProductCount } = useContext(CartContext);

  return (
    <div className="flex gap-2 flex-col sm:flex-row">
      <div className="cart-item flex-grow flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-100 py-4 px-6 rounded-lg gap-3">
        <img
          src={imageCover}
          alt={title}
          loading="lazy"
          className="w-24 h-24 object-cover rounded-lg mx-auto sm:mx-0"
        />

        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-md text-gray-700 font-semibold ">
            <Link to={`/product/${id}`}>{title}</Link>
          </h3>
          <h4 className="text-gray-500 text-sm">{category.name}</h4>
        </div>

        <div className="count flex justify-center sm:justify-start">
          <div className="icons flex items-center gap-2 sm:flex-col sm:gap-1">
            <div
              className="plus"
              onClick={() => {
                updateProductCount({ productId: id, count: count + 1 });
              }}
            >
              <i className="fa-solid fa-plus w-6 h-6 rounded-full bg-gray-800 text-white flex justify-center items-center cursor-pointer"></i>
            </div>
            <span className="font-semibold">{count}</span>
            <div
              className="minus"
              onClick={() => {
                updateProductCount({ productId: id, count: count - 1 });
              }}
            >
              <i className="fa-solid fa-minus w-6 h-6 rounded-full bg-gray-800 text-white flex justify-center items-center cursor-pointer"></i>
            </div>
          </div>
        </div>

        <span className="text-center sm:text-right font-medium">
          {price} L.E
        </span>
      </div>

      <button
        onClick={() => {
          removeProductFromCart({ productId: id });
        }}
        className="rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-300 p-3 self-center sm:self-auto"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}
