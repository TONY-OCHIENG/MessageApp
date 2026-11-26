import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "../types/types";
import { apiClient } from "../lib/ClientURL";

export const userStore = create<User>()(
    devtools((set) => ({
        users: [],
        loading: false,
        error: null,
        getusers: async (user_id: String) => {
            set({loading: true, error: null})
            try {
                const response = await apiClient.get(`/api/v1/users/${user_id}`)
                const { success, result,message} = await response.data
                if (success) {
                    set({loading: false, users: result})
                } else {
                    set({loading: false, error: message, users: []})
                }
            } catch (error) {
                console.error("Error in getusers",error)
                set({loading: false,users: []})                
            } finally{
                set({loading: false})
            }
        }
    }))
) 