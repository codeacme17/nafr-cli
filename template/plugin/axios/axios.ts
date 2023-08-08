import axios from "axios"

const _axios = axios.create({
  timeout: 30 * 1000,
})

export type ResponseBody = {
  code: number
  message: string
  data: Record<any, any>
}

_axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  (response) => {
    const { code, message } = response.data
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default _axios
