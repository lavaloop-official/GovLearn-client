import {configureStore} from "@reduxjs/toolkit";
import modalslice from "./modalslice.ts";

const reduxStore = configureStore({reducer: {loginModal: modalslice}});

export default reduxStore;
export type RootState = ReturnType<typeof reduxStore.getState>