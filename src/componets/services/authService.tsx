import { fetchBaseQuery,createApi } from "@reduxjs/toolkit/query/react";


interface TAuth {
    email: string;
    password: string;
}

export interface TAuthResponse {
    accessToken: string;
    user?: { name: string; role: string };
    refreshToken?: string; 
  }
  

interface TRegister {
    name: string;
    email: string;
    password: string;
    activationToken: string;
  }

  interface TActivate {
    activation_code: string;
    activation_token: string;
  }



  export const authService = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
        credentials: "include",
  }),
    endpoints: (builder) =>({
        // register user
        authRegister: builder.mutation<TRegister,Omit<TRegister, "activationToken">>({
            query: (user) => ({
                url: '/user/register',
                method: 'POST',
                body: user
            }),
        }),

        // login user
        authLogin: builder.mutation<TAuthResponse,Partial<TAuth>>({
            query: (newUser) => ({
                url: '/user/login',
                method: 'POST',
                body: newUser
            }),
        }),

        activateUser: builder.mutation<TActivate, Partial<TActivate>>({
            query: ({activation_code, activation_token}) =>({
                url: "user/activate-you",
                method: "POST",
                body: {activation_code,activation_token}
            })
        }),

        // logout user
        authLogout: builder.mutation<{message: string}, void>({
            query: () => ({
                url: '/user/logout',
                method: 'POST',
                credentials: "include"  
            })
        }),

    })
  })


  export const {
    useAuthRegisterMutation,
    useAuthLoginMutation,
    useActivateUserMutation,
    useAuthLogoutMutation,
  } = authService;