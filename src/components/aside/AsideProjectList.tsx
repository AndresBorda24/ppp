import { Icon } from '@iconify-icon/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AsideButton } from './AsideButton'

interface Props {
  projects: any[],
  label: string
}
export const AsideProjectList: React.FC<Props> = ({ projects = [], label }) => {
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
        > <Icon icon="mingcute:down-fill" className={showList ? '' : '-rotate-90'} /> </button>
      </header>
      <div role='list' className={`overflow-hidden aside-project-list ${!showList && '!hidden'}`}>
        {projects.map((_, index) => <ProjectListItem key={index} title={`Proyecto ${index}`} />)}
      </div>
    </div>
  )
}


interface ProjectItemProps { title: string; }
const ProjectListItem: React.FC<ProjectItemProps> = ({ title }) => {
  return (
    <AsideButton role='listitem' title={title}>
      <Icon icon="ph:book-thin" className='text-blue-700' />
      <span>{title}</span>
    </AsideButton>
  )
}
