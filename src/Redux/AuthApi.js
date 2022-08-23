
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://spektre-prj.herokuapp.com/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set("authorization", `Token ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['Assignments', 'Assignment'],
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
        query() {
          return {
            url: '/projects/assignments/',
            method: "GET",
      

          };

        },
        providesTags: ['Assignments'],
        keepUnusedDataFor: 5,
      }),
      getPendingAsign: builder.query({
        query() {
          return {
            url: '/projects/assignments/?status=PENDING',
            method: "GET",
         

          };

        },
        providesTags: ['Assignments'],
        keepUnusedDataFor: 5,

      }),
      getActiveAsign: builder.query({
        query() {
          return {
            url: '/projects/assignments/?status=ACTIVE',
            method: "GET",
           

          };

        },
        providesTags: ['Assignments'],
          keepUnusedDataFor: 5,

      }),
    getCompletedAsign: builder.query({
        query() {
          return {
            url: '/projects/assignments/?status=COMPLETED',
            method: "GET",
           

          };

        },
      providesTags:['Assignments'],
      keepUnusedDataFor: 5,

      }),
      getUser: builder.query({
        query() {
          return {
            url: '/user/',
            method: "GET",
           

          };

        },
        keepUnusedDataFor: 5,

      }),
      getAsign: builder.query({
        query({ id}) {
          return {
            url: `/projects/assignments/${id}/`,
            method: "GET",
          

          };

        },
        providesTags: ['Assignments', 'Assignment'],
        keepUnusedDataFor: 5,
      }),
      changeAsignStatus: builder.mutation({
       
        query({  id , updateData}) {
         
          return {
            url: `/projects/assignments/${id}/`,
            method: "PATCH",
              body:updateData

          };

        },
        invalidatesTags:['Assignments']
      }),
      OpenTicket: builder.mutation({

        query(respondId) {

          return {
            url: `/projects/tickets/`,
            method: "POST",
            body: respondId

          };

        },
        invalidatesTags: ['Assignment']
      }),
      getTicket: builder.query({
        query({ id }) {
          return {
            url: `/projects/assignments/${id}/`,
            method: "GET",


          };

        },
        providesTags: ['Assignment'],
        keepUnusedDataFor: 5,
      }),
      responseTicket: builder.mutation({

        query({ updateData }) {

          return {
            url: '/projects/responses/',
            method: "POST",
            body: updateData

          };

        },
        invalidatesTags: ['Assignment']
      }),
      CloseTicket: builder.mutation({

        query({ updateData, id }) {

          return {
            url: `/projects/tickets/${id}/`,
            method: "PATCH",
            body: updateData

          };

        },
        invalidatesTags: ['Assignment']
      }),
      getAllTicket: builder.query({
        query() {
          return {
            url: '/projects/assignments/',
            method: "GET",


          };

        },
        providesTags: ['Assignments'],
        keepUnusedDataFor: 5,
      }),

  }),
})

export const { 
  useLoginMutation, 
  useGeAllAsignQuery, 
 useGetPendingAsignQuery,
  useGetActiveAsignQuery,
  useGetCompletedAsignQuery,
 useGetUserQuery,
  useGetAsignQuery,
  useChangeAsignStatusMutation,
  useOpenTicketMutation,
  useGetTicketQuery,
  useResponseTicketMutation,
  useCloseTicketMutation,
  useGetAllTicketQuery
  


} = api;