import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../stores/Auth";

export const GuestMiddleware: React.FC = () => {
  const { user, token } = useAuthStore();

  return !user || !token ? <Outlet /> : <Navigate to={`/`} /> ;
};
