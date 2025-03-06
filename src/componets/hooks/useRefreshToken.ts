"use client";

import { useEffect } from "react";
import { useUpdateTokenMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setAccessToken, logout } from "../services/slices/UserSlice";

export const useTokenRefresh = () => {
  const dispatch = useDispatch();
  const [updateToken] = useUpdateTokenMutation();

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const { accessToken } = await updateToken().unwrap();
        if (accessToken) {
          dispatch(setAccessToken(accessToken)); // Store new access token in Redux
        } else {
          dispatch(logout()); // If no token, log out the user
        }
      } catch (error) {
        console.error("Token refresh failed", error);
        dispatch(logout()); // Ensure user is logged out if refresh fails
      }
    };

    // Set interval for auto-refresh (every 55 minutes, before expiration)
    const interval = setInterval(refreshAccessToken, 55 * 60 * 1000); // 55 minutes

    return () => clearInterval(interval); // Cleanup on unmount
  }, [updateToken, dispatch]);
};
