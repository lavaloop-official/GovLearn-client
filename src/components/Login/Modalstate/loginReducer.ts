import {LoginActionType, LoginState} from "./actiontypes.ts";

const intialState: LoginState = {
    open: false,
    type: 'login',
    loading: false
}


export default function loginReducer(state = intialState, action: { type: LoginActionType; payload: never }) {
    switch (action.type) {
        case 'CHANGE_OPEN':
            return {
                ...state,
                open: action.payload
            }
        case 'CHANGE_TYPE':
            return {
                ...state,
                type: action.payload
            }
        case 'CHANGE_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}