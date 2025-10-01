import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { UserContext } from "../../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartInfo } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const navigate = useNavigate();

  async function createCashOrder(values) {
    let toastId = toast.loading("We are Creating Your Order ....");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Your Order has been Created Successfully");
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      }
    } catch (error) {
      alert(error)
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function handleOnlinePayment(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.loading("Redirecting you to Stripe ...");
        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },

    onSubmit: (values) => {
      if (paymentMethod === "cash") {
        createCashOrder(values);
      } else {
        handleOnlinePayment(values);
      }
    },
  });

  return (
    <section>
      <h1 className="text-2xl mb-3 text-slate-700 font-semibold my-2">
        Shipping Address :
      </h1>

      {!cartInfo?.cartId ? (
        <p className="text-red-500 text-center">
          No cart found. Please add items to your cart before checkout.
        </p>
      ) : (
        <form className="space-y-2" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Your City"
            className="form-control w-full placeholder:text-lg"
            name="shippingAddress.city"
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="form-control w-full placeholder:text-lg"
            name="shippingAddress.phone"
            value={formik.values.shippingAddress.phone}
            onChange={formik.handleChange}
          />
          <textarea
            placeholder="Details"
            className="form-control w-full placeholder:text-lg"
            name="shippingAddress.details"
            value={formik.values.shippingAddress.details}
            onChange={formik.handleChange}
          ></textarea>

          <button
            onClick={() => {
              setPaymentMethod("cash");
            }}
            type="submit"
            className="btn bg-blue-500 hover:bg-blue-600 text-white text-center mt-6 uppercase"
          >
            Cash Order
          </button>

          <button
            onClick={() => {
              setPaymentMethod("online");
            }}
            type="submit"
            className="btn bg-lime-500 hover:bg-lime-600 text-white text-center mt-6 uppercase ms-4"
          >
            Online Payment
          </button>
        </form>
      )}
    </section>
  );
}
