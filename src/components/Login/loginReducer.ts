const intialState = {
    open: false,
    type: 'login',
    loading: false
}

export default function loginReducer(state = intialState, action: any) {
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