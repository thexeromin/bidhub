import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export const Api = (): AxiosInstance => {
  const options: AxiosRequestConfig = {
    baseURL: process.env.NEXT_PUBLIC_API,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
  }
  const instance = axios.create(options)

  instance.interceptors.request.use(
    async (config) => {
      // TODO: fix this as token came from session not localstorage
      const token = null
      if (!token) return config
      const accessToken = token
      config.headers.Authorization = `Bearer ${accessToken}`
      return config
    },
    (error) => {
      console.dir(error, { depth: null })
      return Promise.reject(error)
    },
  )

  return instance
}
