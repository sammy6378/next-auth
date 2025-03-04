"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

function Navbar() {
    const router = useRouter()
  return (
    <nav className="flex items-center justify-between w-full h-16 bg-white px-4 sm:px-6">
      <div className="flex items-center">
        <a href="#" className="text-sm font-medium leading-none text-gray-700">
          NextAuth
        </a>
      </div>
      <div className="flex items-center">
        <button onClick={() => router.push('/user/login')} className="ml-4 text-sm font-medium leading-none text-gray-700">
          Login
        </button>
      </div>
      <div className="flex items-center">
        <button onClick={() => router.push('/user/register')} className="ml-4 text-sm font-medium leading-none text-gray-700">
          Sign Up
        </button>
      </div>
    </nav>
  )
}

export default Navbar