import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import axios from 'axios'
import toast from 'react-hot-toast'
import type { LoginDetails, Registration, RegistrationDetails, Response, ResponseAuth } from '../types/types'
import { apiClient } from '../lib/ClientURL'

export const authStore = create<Registration>()(
  devtools(
    (set) => ({
      loader: false,
      setLoader: (value: boolean) => set({ loader: value }),
      registerAccount: async (details: RegistrationDetails): Promise<Response> => {
        set({ loader: true })
        try {
          const response = await apiClient.post('/api/v1/register', details)
          const { success, message } = response.data
          return { success, message }
        } catch (error) {
          const message = axios.isAxiosError(error)
            ? error.response?.data?.message ?? 'Registration failed'
            : 'Something went wrong'
          toast.error(message)
          return { success: false, message }
        } finally {
          set({ loader: false })
        }
      },
      loginAccount: async (details: LoginDetails): Promise<Response> => {
        set({ loader: true})
        try {
          const response = await apiClient.post('/api/v1/login',details)
          const { success, message } = await response.data
          return { success, message }
        } catch (error) {
          const message = axios.isAxiosError(error)
            ? error.response?.data?.message ?? 'Login failed'
            : 'Something went wrong'
          toast.error(message)
          return { success: false, message }     
        } finally {
          set({loader: false})
        }
      },
      authenticateUser: async (): Promise<ResponseAuth> => {
        set({ loader: true })
        try {
          const response = await apiClient.get('/api/v1/authenticate')
          const { success, user_id} = await response.data
          return { success, user_id }
        } catch (error) {
          // 401/403 = not logged in; anything else is a real failure
          if (axios.isAxiosError(error) && error.response?.status !== 401) {
            console.error('Authentication check failed:', error)
          }
          return { success: false, user_id:""}
        } finally {
          set({ loader: false })
        }
      }
    }),    
    { name: 'registerAccount' }
  )
)