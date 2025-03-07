import { useEffect } from "react";
import { useTokenRefresh } from "./useRefreshToken";
import { useAccessToken } from "./reduxStore";
import {jwtDecode} from "jwt-decode";

export const useAutoRefresh = () => {
  const { refreshAccessToken } = useTokenRefresh();
  const { accessToken } = useAccessToken();

  useEffect(() => {
    if (!accessToken) return;

    // Decode token to get expiry time
    const decodedToken = jwtDecode(accessToken);
    if (!decodedToken.exp) return;
    const expiryTime = decodedToken.exp * 1000; // Convert to milliseconds
    const refreshTime = expiryTime - 60000; // Refresh 1 min before expiry

    const timer = setTimeout(() => {
      refreshAccessToken();
    }, refreshTime - Date.now());

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [accessToken]);
};
