import { create, StateCreator } from "zustand";
import { User } from "../types";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { LOCAL_STORAGE_AUTH_KEY } from "../constants";

interface AuthSlice {
    user: User|null
    token: string|null
    isLogged: boolean
    login(token: string): void
    logout(): void
}

const createAuthSlice: StateCreator<
    AuthSlice, [], [], AuthSlice
> = (set) => ({
    user: null,
    token: null,
    isLogged: false,
    login: (token) => {
       try {
            const decoded = jwtDecode<{ user: User }>(token);
            const user = decoded.user;
            window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, token);
            set(() => ({ token, user, isLogged: true }));
       } catch (error) {
            toast.error('Error al iniciar sesión');
            set(() => ({ token: null, isLogged: false }));
       }
    },
    logout: () => {
        window.localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
        set(() => ({ user: null, isLogged: false, token: null }));
    }
})

export const useAuthStore = create<AuthSlice>()(((...a) => ({
    ...createAuthSlice(...a)
})));
