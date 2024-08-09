import { Icon } from '@iconify-icon/react'
import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'

export default function Aside() {
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
        <ProjectList label={'Mis Proyectos 🌟'} />
      </aside>
    </div>
  )
}

function ProjectList({ projects = [null, null, null, null], label }) {
  const [showList, setShowList] = useState(true)

  return (
    <div className='aside-project-container'>
      <header className='flex items-center'>
        <span className='flex-1 font-bold'>{label}</span>
        <Link
          to='/new-project'
          title='Agregar Proyecto'
          className='flex items-center border border-transparent transition-opacity hover:border-neutral-300 p-1 rounded'
        > <Icon icon="ion:add-outline" /> </Link>
        <button
          type='button'
          title='Expandir / Contrear Listado'
          onClick={() => setShowList(!showList)}
          className='flex items-center border border-transparent transition-opacity hover:border-neutral-300 p-1 rounded'
        > <Icon icon="mingcute:down-fill" className={!showList && '-rotate-90'} /> </button>
      </header>
      <div role='list' className={`overflow-hidden aside-project-list ${!showList && '!hidden'}`}>
        {projects.map((_, index) => <ProjectListItem key={index} />)}
      </div>
    </div>
  )
}

function ProjectListItem() {
  return (
    <AsideButton role='listitem' title='Nombre completo del proyecto'>
      <Icon icon="ph:book-thin" className='text-blue-700' />
      <span>Proyecto #1</span>
    </AsideButton>
  )
}

function AsideButton({ isActive, ...props }) {
  return (
    <div className='flex items-center w-full text-aso-secondary'>
      {isActive && <Icon icon="mdi:menu-right" width={20} height={20} className='text-aso-secondary'/>}
      <button
        {...props}
        className={`flex flex-1 items-center gap-3 px-1 py-1.5 rounded ${isActive ? 'bg-blue-100' : 'hover:bg-blue-50'}`}
      ></button>
    </div>
  )
}
