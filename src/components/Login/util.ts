import {CHANGE_LOADING, CHANGE_OPEN, CHANGE_TYPE, LoginType} from "./Modalstate/actiontypes.ts";
import loginModalStore from "./Modalstate/loginModalStore.ts";
const openModal = (type: LoginType) => {
    loginModalStore.dispatch({type: CHANGE_LOADING, payload: false})
    loginModalStore.dispatch({type: CHANGE_TYPE, payload: type})
    loginModalStore.dispatch({type: CHANGE_OPEN, payload: true})
}

export default openModal;