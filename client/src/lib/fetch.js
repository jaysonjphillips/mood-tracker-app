const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    // cors mode
}

const authHeaders = {
    ...defaultHeaders,
    Authorization: `Bearer ${localStorage.getItem('token') || null}`
}

export const doGet = async (path, withToken = true) => {
    return fetch(path, {
        method: "GET",
        headers: withToken ? authHeaders : defaultHeaders
    })
}

export const doPost = async (path, body, withToken = true) => {
    return fetch(path, {
        method: "POST",
        headers: withToken ? authHeaders : defaultHeaders,
        body
    })
}

export const doPut = async (path, body, withToken = true) => {
    return fetch(path, {
        method: "PUT",
        headers: withToken ? authHeaders : defaultHeaders,
        body
    })
}

export const doDelete = async (path, withToken = true) => {
    return fetch(path, {
        method: "DELETE",
        headers: withToken ? authHeaders : defaultHeaders
    })
}