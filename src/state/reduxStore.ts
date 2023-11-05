import {configureStore} from "@reduxjs/toolkit";
import modalslice from "./modalslice.ts";
import authslice from "./authslice.ts";

const reduxStore = configureStore({reducer: {loginModal: modalslice, auth: authslice}});

export default reduxStore;
export type RootState = ReturnType<typeof reduxStore.getState>