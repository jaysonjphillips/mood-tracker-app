import React from 'react'

const appAuthToken = localStorage.getItem('aat')

export const initialState = {
  isLoggedIn: !!appAuthToken,
  user: null,
  token: appAuthToken || null
}

const AuthContext = React.createContext(initialState)
export default AuthContext
