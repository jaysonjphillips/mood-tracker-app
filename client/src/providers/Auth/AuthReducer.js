import { ACTIONS } from '../../lib/constants'

export default (state, action) => {
  switch (action.type) {
    case ACTIONS.USER_CHECK_SUCCESS: 
      return {
        ...state,
        isLoggedIn: true, 
        profile: action.payload
      }
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        profile: action.payload.user
      }
    case ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      }
    case ACTIONS.LOGOUT_PENDING:
      return {
        ...state,
        isLoggedIn: false,
        profile: null, 
        settings: null
      }
    default:
      return state
  }
}
