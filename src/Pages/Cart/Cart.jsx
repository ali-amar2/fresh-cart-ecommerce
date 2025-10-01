import { useContext, useEffect } from "react";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../Components/Loading/Loading";
import CartItem from "../../Components/CartItem/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getCartProducts, cartInfo, clearCart } = useContext(CartContext);

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <>
      <div className="flex space-x-3 text-2xl text-slate-700 font-semibold mb-3">
        <i className="fa-brands fa-opencart flex items-center"></i>
        <h2>| Your shopping cart</h2>
      </div>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <section>
          {cartInfo.numOfCartItems === 0 ? (
            <div className="mt-6 bg-gray-100 p-6 rounded-md shadow flex justify-center items-center flex-col gap-3">
              <h2>
                Oops! Your cart is empty. Start shopping now by Clicking the
                button below and find something you love
              </h2>
              <Link
                to="/"
                className="btn bg-primary-600 hover:bg-primary-700 text-white"
              >
                Back To Home
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartInfo.data.products.map((product) => (
                  <CartItem key={product._id} productInfo={product} />
                ))}
              </div>
              <div className="mt-4 flex flex-col lg:flex-row justify-between">
                <div className="flex items-center space-x-2 text-xl">
                  <i className="fa-solid fa-sack-dollar text-primary-500 font-bold "></i>
                  <p className="text-xl font-medium">
                    {" "}
                    Your total cart price is{" "}
                    <span className="text-primary-700 font-bold">
                      {cartInfo.data.totalCartPrice}
                    </span>{" "}
                    L.E
                  </p>
                </div>
                <button
                  onClick={clearCart}
                  className="btn bg-red-500 hover:bg-red-600 text-white mt-2"
                >
                  <i className="fas fa-trash mr-2"></i>Clear Cart
                </button>
              </div>

              <Link
                to={"/checkout"}
                className="inline-block btn bg-primary-500 hover:bg-primary-600 text-white w-full text-center mt-6 uppercase"
              >
                Next Step (payment)
              </Link>
            </>
          )}
        </section>
      )}
    </>
  );
}
