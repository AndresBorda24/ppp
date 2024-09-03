import Aside from "../components/Aside"
import { Toaster } from "sonner"
import { Outlet } from "react-router-dom"

export default function Root () {
  return (
    <div className='h-screen flex'>
      <Toaster />
      <Aside />
      <Outlet />
    </div>
  )
}
