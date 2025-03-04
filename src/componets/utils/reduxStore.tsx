import { useSelector } from "react-redux";
import { RootState } from "@/componets/lib/store";
import { IUser } from "@/componets/services/slices/UserSlice";

export const useAuthUser = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.user as IUser | null;
  return user;
};
