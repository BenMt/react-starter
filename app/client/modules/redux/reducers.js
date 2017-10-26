import { combineReducers } from 'redux'

import appReducer from 'modules/app/reducer'

export default combineReducers({
  app: appReducer
})
