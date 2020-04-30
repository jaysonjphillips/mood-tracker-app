import React, { useReducer } from 'react'
import AuthReducer from './AuthReducer'
import AuthContext, { initialState } from './AuthContext'
import { ACTIONS } from '../../lib/constants'

export default ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const login = (data) => {
    dispatch({
      type: ACTIONS.LOGIN_SUCCESS,
      payload: data
    })
  } // make a login request

  const register = () => {} // register the user

  const logout = () => {
    dispatch({
      type: ACTIONS.LOGOUT_PENDING
    })
  } // clear the token in localStorage and the user data

  return (
    <AuthContext.Provider value={{ user: state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}
