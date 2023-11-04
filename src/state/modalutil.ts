import reduxStore from "./reduxStore.ts";
import {openModal, LoginType} from "./modalslice.ts";

export const openLoginModal = (type: LoginType) => {
    reduxStore.dispatch(openModal(type))
}

