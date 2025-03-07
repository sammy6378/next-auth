"use client";

import { useUpdateTokenMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setAccessToken, logout } from "../services/slices/UserSlice";
import toast from "react-hot-toast";

export const useTokenRefresh = () => {
  const dispatch = useDispatch();
  const [updateToken] = useUpdateTokenMutation();

  const refreshAccessToken = async () => {
    try {
      const response = await updateToken().unwrap();
      if (response?.accessToken) {
        dispatch(setAccessToken(response.accessToken)); // Update Redux store
      } else {
        throw new Error("Invalid token response");
      }
    } catch (error) {
      console.error("Token refresh failed", error);
      toast.error("Session Expired. Please login again");
      dispatch(logout());
    }
  };

  return { refreshAccessToken };
};
