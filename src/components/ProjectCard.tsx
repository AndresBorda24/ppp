import { Link } from "react-router-dom"
import { PaginatedProject } from "../types"
import { Icon } from "@iconify-icon/react/dist/iconify.mjs"

interface ProjectCardProps { project: PaginatedProject }

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const description = project.description?.substring(0, 200)

  return (
    <Link
      to={`p/${project.slug}/ver`}
      className='group rounded-lg bg-white border border-dashed border-neutral-200 p-5 hover:bg-neutral-50 transition-colors flex flex-col relative'
    >
      <Icon
        icon="lucide:arrow-up-right"
        className='absolute transition-opacity top-0 right-0 m-2 text-xl text-neutral-600 opacity-0 group-hover:opacity-100'
      />
      <header>
        <h4 className='font-bold text-aso-secondary'>{project.title}</h4>
      </header>
      <p className='text-neutral-600 text-xs whitespace-break-spaces overflow-hidden relative max-h-16 flex-1'>
        <span className="absolute w-full h-16 inset-0 bg-gradient-to-b from-transparent to-white group-hover:to-neutral-50"></span>
        {description || 'Sin descripción registrada... 🥑' }
      </p>
      <footer className='flex items-center justify-between text-xs text-neutral-500 mt-1'>
        <b>{project.created_at}</b>
        <span className='inline-block p-1 rounded-sm bg-amber-100 text-amber-700'>{project.status}</span>
      </footer>
    </Link>
  )
}
