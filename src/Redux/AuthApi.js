
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://spektre-prj.herokuapp.com/api',
    credentials: 'include',
    prepareHeaders: async(headers, { getState }) => {
      const token = await AsyncStorage.getItem('token')
      // console.log(token)
      if (token) {
      // console.log(token, 'valid token')

        headers.set("authorization", `Token ${token}`)
      }
      return headers
    }
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['Assignments', 'Assignment', 'notify'],
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
            url: '/assignments/',
            method: "GET",
      

          };

        },
        providesTags: ['Assignments'],
        keepUnusedDataFor: 5,
      }),
      getPendingAsign: builder.query({
        query() {
          return {
            url: '/assignments/?status=PENDING',
            method: "GET",
         

          };

        },
        providesTags: ['Assignments'],
        keepUnusedDataFor: 5,

      }),
      getActiveAsign: builder.query({
        query() {
          return {
            url: '/assignments/?status=ACTIVE',
            method: "GET",
           

          };

        },
        providesTags: ['Assignments'],
          keepUnusedDataFor: 5,

      }),
    getCompletedAsign: builder.query({
        query() {
          return {
            url: '/assignments/?status=COMPLETED',
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
            url: `/assignments/${id}/`,
            method: "GET",
          

          };

        },
        providesTags: ['Assignments', 'Assignment'],
        keepUnusedDataFor: 5,
      }),
      changeAsignStatus: builder.mutation({
       
        query({  id , updateData}) {
         
          return {
            url: `/assignments/${id}/`,
            method: "PATCH",
              body:updateData

          };

        },
        invalidatesTags:['Assignments']
      }),
      OpenTicket: builder.mutation({

        query(respondId) {

          return {
            url: `/tickets/`,
            method: "POST",
            body: respondId,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };

        },
        invalidatesTags: ['Assignment']
      }),
      getTicket: builder.query({
        query({ id }) {
          return {
            url: `/tickets/${id}/`,
            method: "GET",


          };

        },
        providesTags: ['Assignment'],
        keepUnusedDataFor: 5,
      }),
      responseTicket: builder.mutation({

        query( updateData ) {

          return {
            url: `/responses/`,
            method: "POST",
            body: updateData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };

        },
        invalidatesTags: ['Assignment']
      }),
      CloseTicket: builder.mutation({

        query({ updateData, id }) {

          return {
            url: `/tickets/${id}/`,
            method: "PATCH",
            body: updateData

          };

        },
        invalidatesTags: ['Assignment']
      }),
      getAllTicket: builder.query({
        query() {
          return {
            url: '/assignments/',
            method: "GET",


          };

        },
        providesTags: ['Assignments'],
        keepUnusedDataFor: 5,
      }),
      getNotifications: builder.query({
        query() {
          return {
            url: '/notifications/',
            method: "GET",


          };

        },
  
        providesTags: ['notify'],
        keepUnusedDataFor: 5,
      }),
      getNotification: builder.query({
        query(id) {
          return {
            url: `/notifications/${id}`,
            method: "GET",


          };

        },

        providesTags: ['notify'],

        keepUnusedDataFor: 5,
      }),
      readNofitication: builder.mutation({

        query(id) {

          return {
            url: `/notifications/${id}/`,
            method: "PATCH",
            body:{ 

              seen: true
            }

          };

        },
        invalidatesTags: ['notify']
      }),
      changePassword: builder.mutation({

        query(data) {

          return {
            url: `/change_password/`,
            method: "PATCH",
            boday: data

          };

        },
      
      }),
      uploadDocument: builder.mutation({

        query({id, ...res}) {

          return {
            url: `/assignments/${id}/add-document/`,
            method: "POST",
            body: res,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };

        },
        invalidatesTags: ['Assignment']
      })
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
  useGetAllTicketQuery,
  useGetNotificationsQuery,
  useGetNotificationQuery,
  useReadNofiticationMutation,
  useChangePasswordMutation,
  useUploadDocumentMutation


  


} = api;