import { createSlice } from '@reduxjs/toolkit'


import { api } from './AuthApi'

const initialState={
    token:''
}


export const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
    extraReducers: builder => {
        builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.token = payload.token;
        })
    }
})



export default AuthSlice.reducer