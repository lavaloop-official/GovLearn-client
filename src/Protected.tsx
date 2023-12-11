import {ReactNode} from "react";
import {useSelector} from "react-redux";
import {RootState} from "./state/reduxStore.ts";
import {useNavigate} from "react-router-dom";

const Protected = ({ children }: {children: ReactNode}) => {
    const auth = useSelector((state: RootState) => !!state.auth.auth)
    const navigate = useNavigate();
    //TODO: show reason for redirect
    if (!auth) {
        navigate('/', {replace: true, state: {reason: 'protected', from: window.location.pathname}})
    }
    return (
        <>
            {children}
        </>
    )
}

export default Protected
