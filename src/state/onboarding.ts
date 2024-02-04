import {getToken} from "../api/auth.ts";

function setComplete(key: onboardingKey) {
    const email = getCurrentlyLoggedIn()
    let list = JSON.parse(localStorage.getItem(`onboaring-${key}`) ?? "[]")
    if (!Array.isArray(list))
        list = []
    list.push(email)
    localStorage.setItem(`onboaring-${key}`, JSON.stringify(list))
    return key
}

function checkComplete(key: onboardingKey): boolean {
    const list = JSON.parse(localStorage.getItem(`onboaring-${key}`) ?? "[]")
    if (!Array.isArray(list))
        return false
    const email = getCurrentlyLoggedIn()
    return list.includes(email)
}

function getCurrentlyLoggedIn() {
    const token = getToken()
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload)?.sub;
}

function resetComplete() {
    for (const key in localStorage) {
        if (key.startsWith("onboaring-")) {
            localStorage.removeItem(key)
        }
    }
}

export type onboardingKey = "register" | "discover" | "details"

export {setComplete, checkComplete, resetComplete}