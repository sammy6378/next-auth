"use client";

import React from 'react';
import '../../app.css';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center bg-white shadow-lg p-6 max-w-md w-full rounded-xl">
        <h2 className="text-3xl font-bold text-purple-900 mb-6">Login</h2>

        <form className="w-full space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="input-container"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="input-container"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-center gap-3 mt-3">
                  <div className="flex-grow h-px bg-black-200"></div>
                  <span className="text-sm text-gray-600">OR</span>
                  <div className="flex-grow h-px bg-black-200"></div>
                </div>
        
                <div className="w-full mt-4 flex flex-col justify-between gap-3 md:flex-row">
                  <button
                    className="w-full flex items-center justify-center bg-gray-200 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-300 transition duration-300">
                    <Image src="/github.png" alt="GitHub" className="mr-2" width={25} height={25} />
                    GitHub
                  </button>

                    {/* google auth */}
                  <button
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
