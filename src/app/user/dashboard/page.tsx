"use client"

import { useAuthUser } from "@/componets/hooks/reduxStore";

const Dashboard = () => {
  
  const user = useAuthUser(); // ✅ Get user from Redux
  const name = user?.name;


  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
        <h2>Welcome {name}!</h2>
    </div>
  );
};

export default Dashboard;
