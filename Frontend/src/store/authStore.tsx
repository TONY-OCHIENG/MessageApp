import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Registration,RegistrationDetails, Response } from '../types/types'
import { apiClient } from '../lib/ClientURL'

export const authStore = create<Registration>()(
  devtools((set) => ({
    loader: false,
    setLoader: async () => set((state) => ({ loader: !state.loader })),
    registerAccount: async (details: RegistrationDetails): Promise<Response> => {
      const response = await apiClient.post(`/api/v1/register`, details)
      const { success, message } = response.data
      return { success, message }
    },
  }),{name: "registerAccount"})
)