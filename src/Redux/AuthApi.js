
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://spektre-prj.herokuapp.com/api',
    // prepareHeaders: async(headers, { getState }) => {
    //   // By default, if we have a token in the store, let's use that for authenticated requests
    //   const token = await (getState()).auth.auth.token
    //   console.log(token, 'token')
    //   if (token) {
    //     headers.set('authorization', `Token 4db8fc1f65a65d8b845f58d63b099126cf094aeda376986066af95d4ddcd43bf`)
    //   }
    //   return headers
    // },
  }),
 
    endpoints: (builder) => ({
        login:  builder.mutation({
      query(data) {
        return {
          url:'/login/',
          method: "POST",
          body: data,
         
        };
           
      },
         
    }),
      geAllAsign: builder.query({
        query(token) {
          return {
            url: '/projects/assignments/',
            method: "GET",
         headers:{
           Authorization:`Token  ${token}`
         }

          };

        },
      }),
      getCompletedAsign: builder.query({
        query(token) {
          return {
            url: '/projects/assignments/?status=COMPLETED',
            method: "GET",
            headers: {
              Authorization: `Token  ${token}`
            }

          };

        },
      }),
      getActiveAsign: builder.query({
        query(token) {
          return {
            url: '/projects/assignments/?status=ACTIVE',
            method: "GET",
            headers: {
              Authorization: `Token  ${token}`
            }

          };

        },
      }),
      getPendingAsign: builder.query({
        query(token) {
          return {
            url: '/projects/assignments/?status=PENDING',
            method: "GET",
            headers: {
              Authorization: `Token  ${token}`
            }

          };

        },
      }),
      getUser: builder.query({
        query(token) {
          return {
            url: '/projects/assignments/?status=PENDING',
            method: "GET",
            headers: {
              Authorization: `Token  ${token}`
            }

          };

        },
      }),
      getDetailAsign: builder.query({
        query(token) {
          return {
            url: '/projects/assignments/?status=PENDING',
            method: "GET",
            headers: {
              Authorization: `Token  ${token}`
            }

          };

        },
      }),
  }),
})

export const { useLoginMutation, useGeAllAsignQuery, UseGetPendingAsignQuery, 
  UseGetActiveAsignQuery ,
  UseGetCompletedAsignQuery,
  UseGetUserQuery,
  UserGetDetailAsign

} = api;