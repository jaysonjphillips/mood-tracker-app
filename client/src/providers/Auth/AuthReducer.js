import { ACTIONS } from '../../lib/constants'

export default (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        profile: action.payload.user
      }
    case ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        token: null
      }
    case ACTIONS.LOGOUT_PENDING:
      localStorage.removeItem('token')
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        profile: null, 
        settings: null
      }
    default:
      return state
  }
}
