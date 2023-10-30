import loginReducer from "./loginReducer.ts";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({ reducer: loginReducer });

export default store;