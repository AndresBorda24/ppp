import Aside from "../components/Aside"
import { Toaster } from "sonner"
import { Outlet } from "react-router-dom"
import { AsideMobile } from "../components/AsideMobile"

export default function Root () {
  return (
    <div className='h-screen flex'>
      <Toaster />
      <Aside />
      <Outlet />
      <AsideMobile />
    </div>
  )
}
