"use client"; // ✅ Ensure this is a client component

import { useTokenRefresh } from "./hooks/useRefreshToken";

export default function TokenRefresher() {
  useTokenRefresh(); // ✅ This runs only on the client

  return null; // No UI, just runs in the background
}
