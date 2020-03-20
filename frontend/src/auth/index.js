import { API } from "../config";

export const authenticate = (data, callback) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        callback();
    }
}

export const isAuthenticated = () => {
    if (typeof window !== "undefined" && localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
}

export const signout = callback => {
    if (typeof window !== "undefined") {
        localStorage.removeItem('jwt');
        callback();
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
}