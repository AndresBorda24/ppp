import { NavLink, useLocation } from "react-router-dom"

import { Icon } from '@iconify-icon/react'

export const AsideMobile: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <div className="md:hidden bottom-0 left-0 w-svw fixed">
      <nav className="mx-auto p-1 bg-neutral-100 flex justify-center gap-2 items-end relative py-1">
        <CustomNavLink to='/' label='Projects' icon='ph:books-fill' />
        <AsideMobileButton label='Activity' icon='fluent:tasks-app-20-filled' />
        {
          (pathname === '/') && (
            <NavLink to='/new-project' className='absolute -top-3 right-3 bg-white rounded-full p-3 leading-none font-bold shadow-xl border-t'>
              <Icon icon="material-symbols:add" />
            </NavLink>
          )
        }
      </nav>
    </div>
  )
}

interface AsideMobileProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: string;
  active?: boolean;
}
const AsideMobileButton: React.FC<AsideMobileProps> = ({ label, icon, active = false, ... props }) => {
  return (
    <button {...props} className={`group p-2 flex flex-col items-center text-neutral-800 ${ active && 'font-bold'}`}>
      <span className={`py-0.5 w-full leading-none rounded-xl ${ active ? 'bg-aso-primary/15' : 'group-hover:bg-neutral-200 transition-colors duration-200 ' }`}>
        <Icon icon={icon} className='text-lg' />
      </span>
      <span className="text-xs">{label}</span>
    </button>
  )
}

interface CustomLinkProps extends AsideMobileProps { to: string }
const CustomNavLink: React.FC<Exclude<CustomLinkProps, 'active'>> = ({ label, icon, to, ...props }) => {
  return (
    <NavLink to='/'>
      {({ isActive }) => {
        return (
          <AsideMobileButton
            icon={icon}
            label={label}
            type='button'
            active={isActive}
            {...props}
          />
        )
      }}
    </NavLink>
  )
}
