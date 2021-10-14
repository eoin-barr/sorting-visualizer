import { SET_ALGORITHM } from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ALGORITHM:
      return { ...state, [action.payload]: action.payload }
    default:
      return state
  }
}
