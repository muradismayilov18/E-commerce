import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setUser, logout} from "../features/userSlice.js";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: "/commerce/mehsullar", credentials:'include'}),
    endpoints: (builder) => ({
        register: builder.mutation({
            query(body){
                return{
                    url: "/register",
                    method: "POST",
                    body,
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
               try{
                const {data} = await queryFulfilled
                dispatch(setUser(data))
                dispatch(setIsAuthenticated(true))
               }

               catch(err){

               }
            }
        }),
        login: builder.mutation({
            query(body){
                return{
                    url: "/login",
                    method:"POST",
                    body,
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    const {data} = await queryFulfilled
                    dispatch(setUser(data))
                    dispatch(setIsAuthenticated(true))
                }

                catch(err){

                }
            }
        }),
        logout: builder.query({
            query:()=>"/logout"
        })
    })
        
})


export const {useRegisterMutation, useLoginMutation, useLazyLogoutQuery} = authApi


            