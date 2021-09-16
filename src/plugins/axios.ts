import axios, { AxiosInstance } from 'axios'
import { App } from 'vue'

const makeBaseURL = (): string => {
  const {
    VUE_APP_API_PROTO,
    VUE_APP_API_HOST,
    VUE_APP_API_PORT,
    VUE_APP_API_PREFIX,
  } = process.env
  return `${VUE_APP_API_PROTO}://${VUE_APP_API_HOST}:${VUE_APP_API_PORT}/${VUE_APP_API_PREFIX}/`
}

export const $axios: AxiosInstance = axios.create({ baseURL: makeBaseURL() })

export default (app: App): void => {
  app.config.globalProperties.$axios = $axios
}
