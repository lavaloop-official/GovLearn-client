import {createSlice} from "@reduxjs/toolkit";
import {getToken} from "../api/auth.ts";

const intialState = {
    auth: !!getToken(),
}

const authSlice = createSlice({
    name: 'auth',
    initialState: intialState,
    reducers: {
        setAuth: (state) => {
            state.auth = true
        },
        clearAuth: (state) => {
            state.auth = false
        }
    }
})

export const {
    setAuth,
    clearAuth
} = authSlice.actions

export default authSlice.reducer