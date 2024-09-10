import { NavLink } from 'react-router-dom'
import { AsideButton } from './aside/AsideButton'

const Aside: React.FC = () => {
  return (
    <aside className='sidebar-container hidden md:flex bg-neutral-100 text-neutral-600 text-sm'>
      <div className='md:flex flex-col py-3 px-1' >
        <div className='flex flex-col items-center gap-2 p-2 rounded'>
          <img
            className='max-h-[25px]'
            src="/logo_aso_1_fondo.png"
            alt="Logo de Clínica Asotruma a color pequeño"
          />
          <span
            className='leading-none text-xs text-center whitespace-break-spaces font-bold'
            title='Project Planner ¿Por qué tres P?'
          > PPP </span>
        </div>

        <nav className='flex flex-col items-center py-3 gap-4'>
          <NavLink to='/new-project' className='d-block'>
            {({ isActive }) => (
              <AsideButton
                label='Nuevo'
                icon='material-symbols:add'
                isActive={isActive}
                type='button'
              />
            )}
          </NavLink>
          <NavLink to='/' className='d-block'>
            {({ isActive }) => (
              <AsideButton
                label='Proyectos'
                icon='ph:books-fill'
                isActive={isActive}
                type='button'
              />
            )}
          </NavLink>
          <AsideButton label="Actividad" icon='fluent:tasks-app-20-filled'  type='button'/>
        </nav>
      </div>
    </aside>
  )
}

export default Aside
