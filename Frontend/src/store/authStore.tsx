import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import axios from 'axios'
import toast from 'react-hot-toast'
import type { Registration, RegistrationDetails, Response } from '../types/types'
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
    }),
    { name: 'registerAccount' }
  )
)