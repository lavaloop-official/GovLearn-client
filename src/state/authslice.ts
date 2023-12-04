import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const intialState = {
    authtoken: retrieveAuthToken(),
}

const authSlice = createSlice({
    name: 'auth',
    initialState: intialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<{ token: string, remember: boolean }>) => {
            state.authtoken = action.payload.token
            if (action.payload.remember)
                localStorage.setItem("authtoken", JSON.stringify(action.payload.token))
            else
                sessionStorage.setItem("authtoken", JSON.stringify(action.payload.token))
        },
        clearAuthToken: (state) => {
            state.authtoken = null
            localStorage.removeItem("authtoken")
        }
    }
})

function retrieveAuthToken() {
    const local = localStorage.getItem("authtoken")
    const session = sessionStorage.getItem("authtoken")
    if (local)
        return JSON.parse(local)
    if (session)
        return JSON.parse(session)
    return null
}

export const {
    setAuthToken,
    clearAuthToken
} = authSlice.actions

export default authSlice.reducer