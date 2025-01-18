import { useEffect, useState } from "react";

import { useAuthStore } from "../stores/Auth";

export const useInitialAuth = () => {
  const { login } = useAuthStore();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("pp_auth_token");
    if (token) {
      login(token);
    }
    setStarted(true);
  }, []);

  return { started };
};
