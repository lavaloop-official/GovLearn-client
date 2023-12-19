import {ReactNode} from "react";
import {useSelector} from "react-redux";
import {RootState} from "./state/reduxStore.ts";
import {Navigate} from "react-router-dom";

const Protected = ({ children }: {children: ReactNode}) => {
    const auth = useSelector((state: RootState) => !!state.auth.auth)
    const reason = useSelector((state: RootState) => state.auth.reason)
    //TODO: show reason for redirect
    if (!auth) {
        return <Navigate to={"/"} state={{reason}} replace/>;
    }
    return (
        <>
            {children}
        </>
    )
}

export default Protected
