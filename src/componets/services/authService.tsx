import { fetchBaseQuery,createApi } from "@reduxjs/toolkit/query/react";


interface TAuth {
    email: string;
    password: string;
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
        baseUrl: "https://api-service-a7bbdqhmhyasbvga.southafricanorth-01.azurewebsites.net/api",
        credentials: "include",
  }),
    endpoints: (builder) =>({
        // register user
        authRegister: builder.mutation<TRegister,Partial<TRegister>>({
            query: (user) => ({
                url: '/user/register',
                method: 'POST',
                body: user
            }),
        }),

        // login user
        authLogin: builder.mutation<TAuth,Partial<TAuth>>({
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
        })
    })
  })


  export const {
    useAuthRegisterMutation,
    useAuthLoginMutation,
    useActivateUserMutation,
  } = authService;