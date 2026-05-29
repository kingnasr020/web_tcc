import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) =>
        set({ token, user, isAuthenticated: true }),

      logout: () =>
        set({ token: null, user: null, isAuthenticated: false }),

      getToken: () => get().token,
    }),
    {
      name: "auth-store", // key di localStorage (dibaca axios interceptor)
    }
  )
);

export default useAuthStore;