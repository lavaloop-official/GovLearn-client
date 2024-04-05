import reduxStore from "./reduxStore.ts";
import {LoginType, openModal} from "./modalslice.ts";

export const openLoginModal = (type: LoginType) => {
    reduxStore.dispatch(openModal(type))
}

