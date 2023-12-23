import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getToken} from "../api/auth.ts";

const intialState = {
    auth: !!getToken(),
    reason: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState: intialState,
    reducers: {
        setAuth: (state) => {
            state.auth = true
        },
        clearAuth: (state, action: PayloadAction<string>) => {
            state.reason = action.payload
            state.auth = false
        }
    }
})

export const {
    setAuth,
    clearAuth
} = authSlice.actions

export default authSlice.reducer