import { combineReducers } from 'redux'
import { algorithm } from './algorithm'
import { isRunning } from './running'
import { array } from './array'
import { isTheme } from './theme'

export default combineReducers({
  algorithm,
  isRunning,
  array,
  isTheme,
})