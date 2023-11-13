import {BACKEND_URL} from "../constants/backend";
import reduxStore from "../state/reduxStore";

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body) => {
        const fullurl = BACKEND_URL + url;
        const requestOptions = {
            method,
            headers: authHeader(fullurl),
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(fullurl, requestOptions).then(handleResponse);
    }
}

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = authToken();
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(BACKEND_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

function authToken() {
    return reduxStore.getState().auth.authtoken;
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        /*
        if (!response.ok) {
            if ([401, 403].includes(response.status) && authToken()) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                const logout = () => store.dispatch(authActions.logout());
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        */

        return data;
    });
}