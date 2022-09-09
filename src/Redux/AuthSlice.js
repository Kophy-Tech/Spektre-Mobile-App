import { createSlice } from '@reduxjs/toolkit'


import { api } from './AuthApi'

const initialState={
    token:'',
    notify:null
}


export const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
    extraReducers: builder => {
        // builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        //     state.token = payload.token;
        // }),
            builder.addMatcher(api.endpoints.getNotifications.matchFulfilled, (state, { payload }) => {
                state.notify= payload;
            })
          
    }
})



export default AuthSlice.reducer