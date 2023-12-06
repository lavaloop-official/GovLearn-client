import {configureStore} from "@reduxjs/toolkit";
import modalslice from "./modalslice.ts";
import authslice from "./authslice.ts";
import bookmarkSlice from "./bookmarkslice.ts";

const reduxStore = configureStore({reducer: {loginModal: modalslice, auth: authslice, bookmark: bookmarkSlice}});

export default reduxStore;
export type RootState = ReturnType<typeof reduxStore.getState>