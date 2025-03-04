import { useDispatch } from "react-redux";
import { logout } from "../services/slices/UserSlice";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthLogoutMutation } from "../services/authService";

export function useConfirmLogout() {
  const dispatch = useDispatch();
  const [logoutUser] = useAuthLogoutMutation();

  const handleLogout = async () => {
    try {
      const response = await logoutUser().unwrap(); // ✅ Ensure API request is successful
      toast.success(response.message || "Logout Successful");
      dispatch(logout()); // ✅ Clears user auth state
      redirect("/user/login"); // ✅ Redirects to login page
    } catch (error) {
      toast.error("Logout failed. Try again!");
      console.error("Logout error:", error);
    }
  };

  return { handleLogout };
}
