import { useSelector } from "react-redux";
import { RootState } from "@/componets/lib/store";
import { TUser } from "../services/authService";

export const useAuthUser = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.user as TUser | null;
  if(user)
  return user;
};
