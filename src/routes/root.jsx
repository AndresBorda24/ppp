import Aside from "../components/aside"
import { Outlet } from "react-router-dom"

export default function Root () {
  return (
    <div className='h-screen flex'>
      <Aside />
      <Outlet />
    </div>
  )
}
