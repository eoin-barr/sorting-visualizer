import { combineReducers } from 'redux'
import { algorithm } from './algorithm'
import { isRunning } from './running'
import { array } from './array'

export default combineReducers({
  algorithm,
  isRunning,
  array,
})