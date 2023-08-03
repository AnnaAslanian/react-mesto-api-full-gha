// export const BASE_URL = 'https://another.domainname.studen.nomoreparties.co/';
export const BASE_URL =  "http://localhost:3000";

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

export const authorization = ( userInfo ) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: userInfo.email,
            password: userInfo.password
          })
    })
        .then((res) => checkResponse(res))
        .then((data) => {
            console.log(data)
            localStorage.setItem("token", data.token)
            return data;
        })
}

export const tokenCheck = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
    })
        .then((res) => checkResponse(res));
}