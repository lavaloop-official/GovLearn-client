import {INTERNAL_ERROR, LOGIN_ERROR, REGISTER_ERROR} from "../constants/de.ts";
import {BACKEND_URL} from "../constants/backend.ts";
import {LoginType} from "../state/modalslice.ts";
import {setToken} from "./auth.ts";

async function handleLogin(data: { values: { email: string, password: string, remember: boolean }, type: LoginType }) {
    const {type, values} = data;
    const {remember, ...requestBody} = values;
    const navigateTo = type === "login" ? "/discover" : "/register";
    const endpoint = type === "login" ? "api/v1/users/auth-token" : "api/v1/users";

    //fetch the data from the backend
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    }).catch(() => {
        throw new Error(INTERNAL_ERROR);
    })

    //handle anything that is not a 200 response
    if (!response.ok) {
        //TODO: handle Error codes and send specific error messages
        const json = await response.json();
        const error = json?.messages[0]?.message;
        switch (error) {
            case "User not found":
                throw new Error(LOGIN_ERROR);
            case "Password wrong":
                throw new Error(LOGIN_ERROR);
            case "User exists already":
                throw new Error(REGISTER_ERROR);
            default:
                throw new Error(INTERNAL_ERROR);
        }
    } else {
        const json = await response.json();
        setToken(json.payload.token, remember);
        return navigateTo;
    }
}

export default handleLogin;