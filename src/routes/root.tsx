import Aside from "../components/Aside"
import { Outlet } from "react-router-dom"

export default function Root () {
  return (
    <div className='h-screen flex'>
      <Aside />
      <Outlet />
    </div>
  )
}
