import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { useInitialAuth } from "../hooks/useInitialAuth"

export default function Root () {
  const { started } = useInitialAuth();
  if (!started) return null;

  return (
    <>
      <Toaster closeButton richColors/>
      <Outlet />
    </>
  )
}
