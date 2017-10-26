import { DEFAULT_LOCALE } from 'config'

export const APP_INITIAL_STATE = {
  lang: DEFAULT_LOCALE
}

const initialState = APP_INITIAL_STATE

const appReducer = (state = initialState, action) => {
  const actions = {
    default: () => state
  }
  return (actions[action.type] || actions.default)()
}

export default appReducer
