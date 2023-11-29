import {BACKEND_URL} from "../constants/backend";
import reduxStore from "../state/reduxStore";

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
    return async (url: string, body?: object) => {
        const fullurl = BACKEND_URL + url;

        const response = await fetch(fullurl, {
                method,
                headers: generateHeader(fullurl, method),
                body: body ? JSON.stringify(body) : null
            }
        ).catch(
            (error) => {
                console.log(error)
                return handleError(error)
            }
        );

        return handleResponse(response);
    }
}

function generateHeader(url: string, method: string) {
    const header: HeadersInit = new Headers()
    if (authToken() && url.startsWith(BACKEND_URL))
        header.set("Authorization", "Bearer " + authToken())
    if (method !== "GET")
        header.set("Content-Type", "application/json")

    return header
}

function authToken() {
    return reduxStore.getState().auth.authtoken;
}

async function handleResponse(response: Response | undefined) {
    if (!response)
        return handleError(new Error("No response"))

    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            return undefined;
        }

        return data;
    });
}

function handleError(error: any) {
    console.log(error)
    return undefined;
}

export function changeBookmarkStatus(id: number, status: boolean) {
    //TODO: add implementation
    //should put to /api/bookmark with the id and status
}