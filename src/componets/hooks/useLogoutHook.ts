"use client";

import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { useDispatch } from "react-redux";
import { logout } from "../services/slices/UserSlice";
import toast from "react-hot-toast";
import { useAuthLogoutMutation } from "../services/authService";

export function useConfirmLogout() {
  const dispatch = useDispatch();
  const [logoutUser] = useAuthLogoutMutation();
  const router = useRouter(); 

  const handleLogout = async () => {
    try {
        const response = await logoutUser().unwrap();
        toast.success(response.message || "Logout Successful");
        dispatch(logout());
        router.push("/user/login"); // ✅ Redirect
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Try again!");
    }
  };

  return { handleLogout };
}
