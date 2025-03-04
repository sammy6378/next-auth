"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/componets/utils/reduxStore";

const Dashboard = () => {
  const { data: session, status } = useSession(); // NextAuth session
  const router = useRouter();
  
  const user = useAuthUser(); // ✅ Get user from Redux
  const name = user?.name || "Authenticated User";



  useEffect(() => {
    // Redirect if NO Redux user and NO NextAuth session
    if (!user && !session && status !== "loading") {
      router.push("/user/login");
    }
  }, [user, session, status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      {session ? (
        <h1>Welcome, {session.user?.name || "GitHub/Google User"}!</h1>
      ) : user ? (
        <>
        <h1>Welcome, {name || "Authenticated User"}!</h1>
        </>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

export default Dashboard;
