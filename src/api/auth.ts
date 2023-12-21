import reduxStore from "../state/reduxStore.ts";
import {clearAuth, setAuth} from "../state/authslice.ts";

/**
 * Clears the token from localstorage or sessionstorage
 */
function clearToken(reason: string) {
    localStorage.removeItem("authtoken")
    sessionStorage.removeItem("authtoken")
    reduxStore.dispatch(clearAuth(reason))
}

/**
 * Sets the token in localstorage or sessionstorage depending on the remember parameter
 * @param {string} token
 * @param {boolean} remember
 */
function setToken(token: string, remember: boolean) {
    if (remember)
        localStorage.setItem("authtoken", JSON.stringify(token))
    else
        sessionStorage.setItem("authtoken", JSON.stringify(token))
    reduxStore.dispatch(setAuth())
}

/**
 * Returns the token from localstorage or sessionstorage
 * @returns {string | null}
 */
function getToken() {
    const local = localStorage.getItem("authtoken")
    const session = sessionStorage.getItem("authtoken")
    if (local)
        return JSON.parse(local)
    if (session)
        return JSON.parse(session)
    return null
}

export {clearToken, setToken, getToken}