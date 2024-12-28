import Aside from "../components/Aside"
import { AsideMobile } from "../components/AsideMobile"
import { Outlet } from "react-router-dom"

export default function Auth () {
  return (
    <div className='h-screen flex flex-col md:flex-row'>
      <Aside />
      <Outlet />
      <AsideMobile />
    </div>
  )
}
