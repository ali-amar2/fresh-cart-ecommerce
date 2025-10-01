import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Signup() {
  const navigate = useNavigate();
  const [accountExistError, setAccountExistError] = useState(null);
  const passRegex = /^(?=.*[A-Z]).{8,}$/;
  const PhoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name can not be more than 25 characters"),
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passRegex,
        "Password Should be minimum eight characters and contain at least one upper case English letter"
      ),
    rePassword: string()
      .required("Confirm Password is required")
      .oneOf([ref("password")], "Password and Confirm Password must match"),
    phone: string()
      .required("Phone number is required")
      .matches(PhoneRegex, "We accept egyptian phone numbers only"),
  });

  async function SendDataToRegister(values) {
    const loadingToastID = toast.loading("Waiting ..");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("User Created Successfully");
        navigate("/login");
      }
    } catch (error) {
      setAccountExistError(error.response.data.message);
      toast.error("Account Already Exist");
    } finally {
      toast.dismiss(loadingToastID);
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: SendDataToRegister,
  });

  return (
    <>
      <h1 className="text-slate-700 text-3xl mb-4">
        <i className="fa-regular fa-circle-user mr-2 text-primary-500"></i>
        Register Now :
      </h1>
      <form className="space-y-2" onSubmit={formik.handleSubmit}>
        <div className="name flex justify-center">
          <input
            type="text"
            name="name"
            className="w-[70%] form-control placeholder:text-slate-500"
            placeholder="Type Your Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </div>
        {formik.errors.name && formik.touched.name && (
          <p className="text-red-500 ml-[16%] ">{formik.errors.name}</p>
        )}

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
        {formik.errors.password && formik.touched.password && (
          <p className="text-red-500 ml-[16%] ">{formik.errors.password}</p>
        )}

        <div className="rePassword flex justify-center">
          <input
            type="password"
            name="rePassword"
            className="w-[70%] form-control placeholder:text-slate-500"
            placeholder="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
          />
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && (
          <p className="text-red-500 ml-[16%] ">{formik.errors.rePassword}</p>
        )}

        <div className="phone flex justify-center">
          <input
            type="tel"
            name="phone"
            className="w-[70%] form-control placeholder:text-slate-500"
            placeholder="Phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <p className="text-red-500 ml-[16%] ">{formik.errors.phone}</p>
        )}

        <button className="btn flex py-2 px-10 m-auto" type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
}
