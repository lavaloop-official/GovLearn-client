import {LoginType} from "../components/Login/Modalstate/actiontypes.ts";
import {INTERNAL_ERROR, LOGIN_ERROR, REGISTER_ERROR} from "../constants/de.ts";

async function handleLogin(data: {values: object, type: LoginType}) {
    const navigateTo = data.type === "login" ? "/discover" : "/register";

    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1500));

    //TODO: implemtent API call to backend

    //return {worked: false, message: "Login failed!"};
    return {worked: false, message: INTERNAL_ERROR, naviageTo: navigateTo};
}

export default handleLogin;