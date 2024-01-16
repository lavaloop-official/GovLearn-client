import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type LoginType = 'login' | 'register' | 'forgot' | 'resetsuccess';

interface LoginState {
    open: boolean;
    type: LoginType;
    loading: boolean;
    alert: string
}

const intialState: LoginState = {
    open: false,
    type: 'login',
    loading: false,
    alert: ""
}

const modalSlice = createSlice({
    name: 'loginmodal',
    initialState: intialState,
    reducers: {
        changeType: (state, action: PayloadAction<LoginType>) => {
            if (state.loading)
                return
            state.alert = ""
            state.type = action.payload
        },
        changeLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        openModal: (state, action: PayloadAction<LoginType>) => {
            state.loading = false
            state.type = action.payload
            state.open = true
        },
        closeModal: (state) => {
            if (state.loading)
                return
            state.open = false
            state.alert = ""
        },
        changeAlert: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.alert = action.payload
        }
    }
})

export const {
    changeLoading,
    changeType,
    openModal,
    closeModal,
    changeAlert
} = modalSlice.actions
export default modalSlice.reducer