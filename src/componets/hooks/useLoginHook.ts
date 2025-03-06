"use client"

import toast from 'react-hot-toast';
import { useAuthLoginMutation } from '../services/authService';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../services/slices/UserSlice';


interface user {
    email: string;
    password: string;
  }
export function useConfirmLogin(){
    const [loginUser] = useAuthLoginMutation();
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogin = async (values:user) =>{
        try {
            const response = await loginUser(values).unwrap();
             if (response?.accessToken) {
                    dispatch(
                      login({
                      user: response.user || null,
                      accessToken: response.accessToken
                      })
                    );
                    toast.success("Login Successful");
                    router.push('/user/dashboard');
                }else {
                    toast.error("Invalid credentials");
                  }
            
        } catch (error) {
            console.error("Login error:", error);
          toast.error("Login failed. Try again!");
        }
    }

   return {handleLogin}
}