"use client";

import React,{useState} from 'react';
import '../../app.css';
import Image from 'next/image';
import Link from 'next/link';
import { ValidateLoginSchema } from '@/componets/utils/validate';
import { useFormik } from 'formik';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {toast} from 'react-hot-toast'
import { signIn } from 'next-auth/react';
import { useConfirmLogin } from '@/componets/hooks/useLoginHook';
interface FormData {
  email: string;
  password: string;
}
const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const { handleLogin } = useConfirmLogin();

  const onSubmit = async (values: FormData) => {
    setloading(true);
   
    try {
      await handleLogin(values);
    } catch (error) {
      if(error instanceof Error){
          toast.error(error.message);
        }else{
          toast.error("Login Failed");
        }
    } finally {
      setloading(false);
    }
  };

     const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
          initialValues: { email: "", password: "" },
          validationSchema: ValidateLoginSchema,
          onSubmit,
        });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center bg-white shadow-lg p-6 max-w-md w-full rounded-xl">
        <h2 className="text-3xl font-bold text-purple-900 mb-6">Login</h2>

        <form className="w-full space-y-4" onSubmit={handleSubmit}>
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
            {!loading ? "Sign In" : "Signing In..."}
          </button>
        </form>

        <div className="flex items-center justify-center gap-3 mt-3">
                  <div className="flex-grow h-px bg-black-200"></div>
                  <span className="text-sm text-gray-600">OR</span>
                  <div className="flex-grow h-px bg-black-200"></div>
                </div>
        
                <div className="w-full mt-4 flex flex-col justify-between gap-3 md:flex-row">
                  <button onClick={() => signIn("github", { callbackUrl: "/user/dashboard" })}
                    className="w-full flex items-center justify-center bg-gray-200 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-300 transition duration-300">
                    
                    <Image src="/github.png" alt="GitHub" className="mr-2" width={25} height={25} />
                    GitHub
                  </button>

                    {/* google auth */}
                  <button onClick={() => signIn("google", { callbackUrl: "/user/dashboard" })}
                    className="w-full flex items-center justify-center bg-gray-200 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-300 transition duration-300">
                    <Image src="/google.png" alt="GitHub" className="mr-2" width={25} height={25} />
                    Google
                  </button>
                </div>

        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account? <Link href="/user/register" className="text-purple-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
