import { createSlice } from '@reduxjs/toolkit'


import { api } from './AuthApi'

const initialState={
    token:null,
    notify:null,
    onBoard:true
}


export const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    tokenSet: (state, {payload}) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = payload
    },
    getOnboard:(state, {payload})=>{
      state.onBoard =payload
    }

},
    extraReducers: builder => {
        // builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        //     state.token = payload.token;
        // }),
            builder.addMatcher(api.endpoints.getNotifications.matchFulfilled, (state, { payload }) => {
                state.notify= payload;
            })
          
    }
})


export const { tokenSet, getOnboard } = AuthSlice.actions
export default AuthSlice.reducer