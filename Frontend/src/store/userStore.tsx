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
            
        }
    }))
) 