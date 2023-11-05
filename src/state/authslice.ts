import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const intialState = {
    authtoken: JSON.parse(localStorage.getItem("authtoken") || "null"),
}

const authSlice = createSlice({
    name: 'auth',
    initialState: intialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<string>) => {
            state.authtoken = action.payload
            localStorage.setItem("authtoken", JSON.stringify(action.payload))
        },
        clearAuthToken: (state) => {
            state.authtoken = null
            localStorage.removeItem("authtoken")
        }
    }
})

export const {
    setAuthToken,
    clearAuthToken
} = authSlice.actions

export default authSlice.reducer