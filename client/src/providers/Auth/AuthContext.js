import React from 'react'

export const initialState = {
  isLoggedIn: null,
  profile: null,
  settings: null
}

const AuthContext = React.createContext(initialState)
export default AuthContext
