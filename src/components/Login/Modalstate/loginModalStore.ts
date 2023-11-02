import loginReducer from "./loginReducer.ts";
import {configureStore} from "@reduxjs/toolkit";

const loginModalStore = configureStore({ reducer: loginReducer });

export default loginModalStore;