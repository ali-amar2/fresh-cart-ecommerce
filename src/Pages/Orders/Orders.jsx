import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User.context";
import { jwtDecode } from "jwt-decode";
import Loading from "../../Components/Loading/Loading";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { token } = useContext(UserContext);

  let id = "";
  try {
    id = jwtDecode(token).id;
  } catch (err) {
    console.error("Invalid token");
  }

  async function getUserOrders() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id) getUserOrders();
  }, [id]);

  if (!orders) return <Loading />;

  return (
    <section className="space-y-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="order p-4 border-solid border-2 border-gray-700 border-opacity-25 rounded-lg"
        >
          <header className="flex flex-col md:flex-row md:items-center space-y-1 justify-between mb-3">
            <div>
              <h2 className="text-gray-400">Order Id</h2>
              <span className="text-md font-semibold">{order._id}</span>
            </div>
            <div className="space-x-2">
              {order.isPaid ? (
                <span className="inline-block px-3 py-1 bg-lime-500 text-white font-semibold rounded-full hover:bg-lime-600 font-cairo">
                  تم الدفع
                </span>
              ) : (
                <span className="inline-block px-3 py-1 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 font-cairo">
                  غير مدفوع
                </span>
              )}
              {order.isDelivered ? (
                <span className="inline-block px-3 py-1 bg-lime-500 text-white font-semibold rounded-full hover:bg-lime-600 font-cairo">
                  تم الاستلام
                </span>
              ) : (
                <span className="inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 font-cairo">
                  قيد التوصيل
                </span>
              )}
            </div>
          </header>

          <div className="grid md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {order.cartItems.map((product) => (
              <div
                key={product._id}
                className="product-item border-2 border-solid border-primary-500 border-opacity-30 rounded-lg overflow-hidden"
              >
                <img
                  src={product.product.imageCover}
                  alt={product.product.titl}
                  className="w-full mb-3"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-2 mb-2">
                    <Link to={`/product/${product.product.id}`}>
                      {product.product.title}
                    </Link>
                  </h3>
                  <div className="flex justify-between items-center ">
                    <p>
                      <span className="text-gray-500 font-semibold ">
                        Count : {product.count}
                      </span>
                    </p>
                    <span>{product.price} L.E</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-lg mt-4">
            Your Total Order Price is :{" "}
            <span className="mx-1 font-bold text-primary-500">
              {order.totalOrderPrice}
            </span>{" "}
            L.E
          </p>
        </div>
      ))}
    </section>
  );
}
