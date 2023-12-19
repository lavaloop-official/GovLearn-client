import {BACKEND_URL} from "../constants/backend";
import {clearToken, getToken} from "./auth.ts";

//TODO: add proper error handling

/**
 * Wrapper for fetch that automatically adds the auth token to the header
 * usage: fetchWrapper.get("/api/endpoint") or fetchWrapper.post("/api/endpoint", body) ... etc
 * @param url api endpoint to call (backend url is automatically prepended)
 * @param body optional body for POST and PUT requests
 * @returns response body
 */
export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method: string) {
    return async (url: string, body?: object, needsAuth: boolean = true) => {
        const fullurl = BACKEND_URL + url;

        const headers = generateHeader(fullurl, method)
        if (needsAuth && !headers.has("Authorization"))
            return handleError(new Error("No auth token"))

        const response = await fetch(fullurl, {
                method,
                headers: headers,
                body: body ? JSON.stringify(body) : null
            }
        ).catch(
            (error) => {
                console.log(error)
                return handleError(error)
            }
        )
        return handleResponse(response);
    }
}

function generateHeader(url: string, method: string) {
    const header: HeadersInit = new Headers()
    if (getToken() && url.startsWith(BACKEND_URL))
        header.set("Authorization", "Bearer " + getToken())
    if (method !== "GET")
        header.set("Content-Type", "application/json")

    return header
}

async function handleResponse(response: Response | undefined) {
    if (!response)
        return handleError(new Error("No response"))

    return response.text().then(text => {
        if (!response.ok) {
            return handleErrorCode(response)
        }
        return text && JSON.parse(text);
    });
}

function handleErrorCode(response: Response) {
    switch (response.status) {
        case 403:
            if (!response.url.endsWith("bookmarks"))
                clearToken("401");
            break;
        case 401:
            return handleError(new Error("Unauthorized"))
        case 404:
            return handleError(new Error("Not found"))
        case 500:
            return handleError(new Error("Internal server error"))
        default:
            return handleError(new Error("Unknown error"))
    }
}

function handleError(error: any) {
    console.error(error)
    return undefined;
}

