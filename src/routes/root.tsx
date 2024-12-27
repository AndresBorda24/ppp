import Aside from "../components/Aside"
import { Toaster } from "sonner"
import { Outlet } from "react-router-dom"
import { AsideMobile } from "../components/AsideMobile"
import { useInitialAuth } from "../hooks/useInitialAuth"
import { useAuthStore } from "../stores/Auth"

export default function Root () {
  useInitialAuth();
  const { isLogged } = useAuthStore();

  return (
    <div className='h-screen flex flex-col md:flex-row'>
      {isLogged ? (
        <>
          <Toaster />
          <Aside />
          <Outlet />
          <AsideMobile />
        </>
      ) : (
        <span>Logged out</span>
      ) }
    </div>
  )
}
