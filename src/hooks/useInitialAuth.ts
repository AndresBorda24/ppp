import { useAuthStore } from "../stores/Auth";
import { useEffect } from "react";

export const useInitialAuth = () => {
  const { login } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("pp_auth_token");
    if (token) {
      login(token);
    }
  }, [login]);
};
