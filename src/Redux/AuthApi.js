
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tokenSet } from './AuthSlice';

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://64.226.94.149/en/api',
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
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
// console.log(result?.meta?.response?.status, 'resultsproductResult')


  if (result?.meta?.response?.status === 401 || result?.meta?.response?.status === 403) {
      // console.log('sending refresh token')
      // send refresh token to get new access token 
      AsyncStorage.removeItem('token')
      api.dispatch(tokenSet(null))
     
  }

  return result
}
export const api = createApi({
    reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
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
        providesTags: ['Assignment'],
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

        query({id, data}) {
// console.log(data, 'uplaod')
          return {
            url: `/assignments/${id}/add-document/`,
            method: "POST",
            body: data,
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