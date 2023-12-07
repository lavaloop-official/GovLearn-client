import {ReactNode} from "react";
import {useSelector} from "react-redux";
import {RootState} from "./state/reduxStore.ts";
import {Navigate} from "react-router-dom";

const Protected = ({ children }: {children: ReactNode}) => {
    const auth = useSelector((state: RootState) => !!state.auth.auth)
    if (!auth) {
        return <Navigate to={"/"} replace/>;
    }
    return (
        <>
            {children}
        </>
    )
}

export default Protected
