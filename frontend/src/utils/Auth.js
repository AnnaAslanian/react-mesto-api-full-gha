export const BASE_URL = 'http://localhost:3000';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
        .then((res) => checkResponse(res));
}

export const authorization = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
        .then((res) => checkResponse(res))
        .then((data) => {
            localStorage.setItem("userId", data._id)
            return data;
        })
}


export const tokenCheck = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => checkResponse(res));
}