"use client";

import React, { useState } from "react";
import "../../app.css";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import { validateRegisterSchema } from "@/componets/utils/validate";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useContextFunc } from "@/context/authContext";
import {toast} from 'react-hot-toast'
import { useAuthRegisterMutation } from "@/componets/services/authService";
import { signIn } from "next-auth/react";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const {setActivationToken} = useContextFunc();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [registerUser] = useAuthRegisterMutation();
  //submit function
  const onSubmit = async (values: FormData) => {
    setloading(true);
    try {
      const response = await registerUser(values).unwrap();
      if(response){
        if(response.activationToken){
          setActivationToken(response.activationToken); 
          router.push('/user/activate-user');
          toast.success("Registration Success");
        }
      }else{
        toast.error("Registration failed");
      }
      
    } catch (error) {
      console.log("Error response:", error); 
      if(error instanceof Error){
        toast.error(error.message);
      }else{
        toast.error("An unexpected error occurred");
      }
    }finally{
      setloading(false);
    }
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: { name: "", email: "", password: "" },
      validationSchema: validateRegisterSchema,
      onSubmit,
    });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center bg-white shadow-lg p-6 max-w-md w-full rounded-xl max-md:mx-2 max-md:py-2 max-500:p-2 relative">
        <h2 className="text-3xl font-bold text-purple-900 mb-2">
          Sign Up
        </h2>

        <form className="w-full" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="input-label">
              Name:
            </label>
            <input
              type="text"
              value={values.name}
              onChange={handleChange}
              id="name"
              onBlur={handleBlur}
              placeholder="Enter your name"
              className={`input-container ${errors.name && touched.name ? "input-error" : ""}`}
            />
            {errors.name && touched.name && (
              <div className="error-message">{errors.name}</div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="input-label">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={values.email}
              id="email"
              onBlur={handleBlur}
              className={`input-container ${errors.email && touched.email ? "input-error" : ""}`}
              onChange={handleChange}
            />
            {errors.email && touched.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div>
            <div className="relative">
              <label htmlFor="password" className="input-label">
                Password:
              </label>
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Password"
                id="password"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                className={`input-container ${errors.password && touched.password ? "input-error" : ""}`}
              />
              {showPassword ? (
                <span
                  className="absolute top-[54%] right-2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FaEyeSlash />
                </span>
              ) : (
                <span
                  className="absolute top-[54%] right-2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FaEye />
                </span>
              )}
            </div>
            {errors.password && touched.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <button type="submit" className={`submit-button mt-3 ${loading ? "bg-purple-500/60 cursor-not-allowed" : ""}`} disabled={loading}>
            {!loading ? "Sign Up" : "Signing up..."}
          </button>
        </form>
        
        <div className="w-full flex items-center justify-center gap-3 mb-3 mt-4">
          <hr className="w-full h-px bg-gray-400 "></hr>
          <span className="text-sm text-gray-600 ">OR</span>
          <hr className="w-full h-px bg-gray-400"></hr>
        </div>

         <div className="w-full mt-4 flex flex-col justify-between gap-3 md:flex-row">
            <button onClick={() => signIn("github")}
              className="w-full flex items-center justify-center bg-gray-200 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-300 transition duration-300">
              <Image src="/github.png" alt="GitHub" className="mr-2" width={25} height={25} />
              GitHub
            </button>

              {/* google auth */}
            <button onClick={() => signIn("google")}
              className="w-full flex items-center justify-center bg-gray-200 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-300 transition duration-300">
              <Image src="/google.png" alt="GitHub" className="mr-2" width={25} height={25} />
              Google
            </button>
          </div>

        <p className="text-sm text-gray-600 mt-4 pb-2">
          Already have an account?{" "}
          <Link href="/user/login" className="text-purple-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
