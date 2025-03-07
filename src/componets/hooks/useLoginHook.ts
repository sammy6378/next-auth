"use client"

import toast from 'react-hot-toast';
import { useAuthLoginMutation } from '../services/authService';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '../services/slices/UserSlice';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useSocialAuthMutation } from '../services/authService';
import { useAccessToken } from './reduxStore';
import { setAccessToken } from '../services/slices/UserSlice';

interface user {
    email: string;
    password: string;
  }
export function useConfirmLogin(){
    const [loginUser] = useAuthLoginMutation();
    const [socialAuth] = useSocialAuthMutation();
    const router = useRouter();
    const dispatch = useDispatch();
    const { data } = useSession();
    const accessToken = useAccessToken();

  useEffect(() =>{
    if(data && !accessToken){
      (async () =>{
        try {

          const userData ={
            name: data.user?.name as string,
            email: data.user?.email as string,
            avatar: data.user?.image as string,
          }

          console.log("Sending user data:", userData);
          const response = await socialAuth(userData).unwrap();
          console.log("Social Auth API Response:", response);


          if (response?.accessToken) {
           dispatch(setAccessToken(response.accessToken));
            dispatch(
              login({
              user: response.user || null,
              accessToken: response.accessToken,
              })
            );
            toast.success("Login Successfull");
            router.push('/user/dashboard');
          }else{
            router.push("/user/login");
            toast.error("Login failed. Try again!");
          }
        } catch (error) {
          console.error(error);
          if (error instanceof Error){
            toast.error(error.message);
          }else{
            toast.error("Login failed. Try again!");
          }
        }
    })();
    }
  },[data,accessToken])


    const handleLogin = async (values:user) =>{
        try {
            const response = await loginUser(values).unwrap();
             if (response?.accessToken) {
              dispatch(setAccessToken(response.accessToken));
                    dispatch(
                      login({
                      user: response.user || null,
                      accessToken: response.accessToken,
                      })
                    );
                    toast.success("Login Successful");
                    router.push('/user/dashboard');
                }else {
                    router.push("/user/login");
                    toast.error("Invalid credentials");
                  }
            
        } catch (error) {
            console.error("Login error:", error);
          toast.error("Login failed. Try again!");
        }
    }

   return {handleLogin}
}