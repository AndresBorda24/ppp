import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { useInitialAuth } from "../hooks/useInitialAuth"

export default function Root () {
  useInitialAuth();

  return (
    <>
      <Toaster closeButton richColors/>
      <Outlet />
    </>
  )
}
