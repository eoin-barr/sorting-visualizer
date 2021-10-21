import { createAction, handleActions } from 'redux-actions'

const initialState = true

export const SET_THEME = 'SET_THEME'
export const setTheme = createAction(SET_THEME)

export const isTheme = handleActions({
  SET_THEME: (state, { payload }) => {
    return payload
  },
}, initialState)