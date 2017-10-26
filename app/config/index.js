export const isProd = process.env.NODE_ENV === 'production'

export const WEB_PORT = process.env.PORT || 3030
export const DEV_SERVER_PORT = 3000
export const STATIC_PATH = '/static'

export const APP_NAME = 'Kollecti'
export const APP_CONTAINER = 'app-container'
export const APP_REDUX_STATE = '__REDUX_STATE__'

export const SUPPORTED_LOCALES = ['en', 'fr']
export const DEFAULT_LOCALE = 'en'

export const API_URL = 'https://kollecti-backend.herokuapp.com'
