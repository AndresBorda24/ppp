import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../stores/Auth";

export const AuthMiddleware: React.FC = () => {
  const { user, token } = useAuthStore();
  return !user || !token ? <Navigate to={`/login`} /> : <Outlet />;
};
