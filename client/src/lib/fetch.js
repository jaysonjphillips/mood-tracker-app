const reqHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
  // cors mode
}

export const doGet = async (path) => {
  return fetch(path, {
    method: 'GET',
    headers: reqHeaders
  })
}

export const doPost = async (path, body) => {
  return fetch(path, {
    method: 'POST',
    headers: reqHeaders,
    body
  })
}

export const doPut = async (path, body) => {
  return fetch(path, {
    method: 'PUT',
    headers: reqHeaders,
    body
  })
}

export const doDelete = async (path) => {
  return fetch(path, {
    method: 'DELETE',
    headers: reqHeaders
  })
}
