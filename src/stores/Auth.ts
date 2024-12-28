import { JwtPayload, jwtDecode } from "jwt-decode";
import { StateCreator, create } from "zustand";

import { LOCAL_STORAGE_AUTH_KEY } from "../constants";
import { User } from "../types";
import { toast } from "sonner";

interface AuthSlice {
  user: User | null;
  token: string | null;
  isLogged: boolean;
  login(token: string): void;
  logout(): void;
}

const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  user: null,
  token: null,
  isLogged: false,
  login: (token) => {
    try {
      const decoded = jwtDecode<JwtPayload & { user: User }>(token);
      if (decoded.exp && Date.now() >= decoded.exp * 1000)
        throw new Error("Token expired");

      const user = decoded.user;
      window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, token);
      set(() => ({ token, user, isLogged: true }));
    } catch (error) {
      toast.info("Inicio de sesión requerido.");
      set(() => ({ token: null, isLogged: false, user: null }));
    }
  },
  logout: () => {
    window.localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    set(() => ({ user: null, isLogged: false, token: null }));
  },
});

export const useAuthStore = create<AuthSlice>()((...a) => ({
  ...createAuthSlice(...a),
}));
