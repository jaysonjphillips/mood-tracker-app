import React from 'react'

const appAuthToken = localStorage.getItem('aat')

export const initialState = {
  isLoggedIn: !!appAuthToken,
  profile: null,
  token: appAuthToken || null,
  settings: null
}

const AuthContext = React.createContext(initialState)
export default AuthContext
