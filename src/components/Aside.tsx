import { Icon } from '@iconify-icon/react'
import { NavLink } from 'react-router-dom'
import { AsideButton } from './aside/AsideButton'
import { AsideProjectList } from './aside/AsideProjectList'

const Aside: React.FC = () => {
  return (
    <div className='sidebar-container flex flex-col p-3 bg-neutral-100 text-neutral-600 text-sms min-w-[220px] border-r'>
      <div className='grid place-items-center'>
        <img
          className='max-h-[30px]'
          src="https://intranet.asotrauma.com.co/index_nuevo/img/Logo_sinFondo.png"
          alt="Logo de Clínica Asotruma a color pequeño"
        />
        <span className='font-semibold'>Project Planner</span>
      </div>

      <aside className='flex flex-col py-3 gap-4 items-end'>
        <NavLink to='/' className='d-block w-full'>
          {({ isActive }) => (
            <AsideButton isActive={isActive} type='button'>
              {
                isActive
                  ? <Icon icon="ph:books-fill"/>
                  : <Icon icon="ph:books-light"/>
              }
              <b>Ver Todos</b>
            </AsideButton>
          )}
        </NavLink>
        <AsideProjectList label={'Mis Proyectos 🌟'} projects={[]}/>
      </aside>
    </div>
  )
}

export default Aside
