"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useConfirmLogout } from "./hooks/useLogoutHook";
import { useAuthUser } from "./hooks/reduxStore";

export default function Navbar() {
  const router = useRouter();
  const user = useAuthUser();
  const { handleLogout } = useConfirmLogout();

  return (
    <nav className="w-full p-4 font-poppins bg-gray-100 border border-b-1 text-black">

      <section className="flex justify-between items-center px-3">
        <Link href={"/"}>
        <h2>Next-Auth</h2>
        </Link>
        <div className="flex justify-between">
            <ul className={`flex items-center gap-5`}>
              <li className="max-700:mt-2 max-700:mb-2">
                <Link href={"/"} className={`hover:text-crimson`}>Home</Link>
              </li>
              <li className="max-700:mb-5">
                <Link href={"/contact"} className={`hover:text-crimson`}>Contact Us</Link>
              </li>
            <li>
            {user ? (
              <button
                onClick={handleLogout}
                className="hover:opacity-90 bg-crimson px-2 py-1 rounded duration-500 max-700:hidden "
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push("/user/login")}
                className="dark:bg-green hover:opacity-90 bg-crimson cursor-pointer px-4 py-1 rounded duration-500 max-700:hidden"
              >
                Login
              </button>
            )}
            </li>
          </ul>
        </div>
      </section>
    </nav>
  );
}