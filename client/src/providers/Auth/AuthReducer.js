import { ACTIONS } from '../../lib/constants'

export default (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload)
      return {
        ...state,
        is_authenticated: true,
        token: action.payload
      }
    case ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        is_authenticated: false,
        token: null
      }
    case ACTIONS.LOGOUT_PENDING:
      localStorage.removeItem('token')
      return {
        ...state,
        is_authenticated: false,
        token: null
      }
    default:
      return state
  }
}
