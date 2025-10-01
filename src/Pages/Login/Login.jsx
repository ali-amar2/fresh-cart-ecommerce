import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { UserContext } from "../../context/User.context";

export default function Login() {
  const { setToken } = useContext(UserContext);

  const navigate = useNavigate();
  const [incorrectEmailError, setIncorrectEmailError] = useState(null);
  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    password: string().required("Password is required"),
  });

  async function SendDataToLogin(values) {
    const loadingToastID = toast.loading("Waiting ..");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setIncorrectEmailError(null);
        toast.success("Login Successfully");
        navigate("/");
      }
    } catch (error) {
      setIncorrectEmailError(error.response.data.message);
    } finally {
      toast.dismiss(loadingToastID);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: SendDataToLogin,
  });

  return (
    <>
      <h1 className="text-slate-700 text-3xl mb-4">
        <i className="fa-regular fa-circle-user mr-2 text-primary-500"></i>Login
        :
      </h1>
      <form className="space-y-2" onSubmit={formik.handleSubmit}>
        <div className="email flex justify-center">
          <input
            type="email"
            name="email"
            className="w-[70%] form-control placeholder:text-slate-500"
            placeholder="Email Address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        {formik.errors.email && formik.touched.email && (
          <p className="text-red-500 ml-[16%] ">{formik.errors.email}</p>
        )}
        <div className="password flex justify-center">
          <input
            type="password"
            name="password"
            className="w-[70%] form-control placeholder:text-slate-500"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>
        {incorrectEmailError && (
          <p className="text-red-500 ml-[16%] ">{incorrectEmailError}</p>
        )}
        <button className="btn flex py-2 px-10 m-auto" type="submit">
          Login
        </button>
      </form>
    </>
  );
}
