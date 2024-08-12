import View from "../components/view.tsx";
import { appFetch } from '../AppFetch'
import { useLoaderData } from "react-router-dom";
import { ProjectFilters } from "../components/ProjectsFilters.tsx";
import { type ActionFunctionArgs } from "react-router-dom";
import { PaginationProjects, PaginatedProject } from '../types';

type LoaderDataType = {
  data: PaginationProjects;
  error: any;
  title: string;
  page: string;
  order: string;
  status: string;
}

export async function loader({ request }: ActionFunctionArgs ) {
  const url = new URL(request.url)
  const title  = url.searchParams.get('title');
  const page   = url.searchParams.get('page');
  const order  = url.searchParams.get('order') ?? 'asc';
  const status = url.searchParams.get('status');

  const { data, error } = await appFetch<PaginationProjects>('GET', {
    url: '/projects', body: null, settings: {
      params: { title, page, status }
    }
  });

  return { data, error, title, page, status, order }
}

export const ProjectFullList: React.FC = () => {
  const { data, title, order, status } = useLoaderData() as LoaderDataType
  const { data: projectList } = data

  return (
    <View title='Todos los proyectos'>
      <div className='flex gap-4'>
        <div className='full-project-list flex-1'>
          {projectList.map((p) => <ProjectCard project={p} key={p.id} />)}
        </div>
        <div className='max-w-sm'>
          <aside className='sticky top-0'>
            <ProjectFilters
              title={title}
              status={status}
              order={order}
            />
          </aside>
        </div>
      </div>
    </View>
  )
}

interface ProjectCardProps { project: PaginatedProject }
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className='rounded-lg bg-white border border-dashed border-neutral-200 p-5 hover:bg-neutral-50 transition-colors'>
      <header>
        <h4 className='font-bold text-aso-secondary'>{project.title}</h4>
      </header>
      <p className='text-neutral-600 text-xs'>{project.description}</p>
      <footer className='flex items-center justify-between text-xs text-neutral-500 mt-1'>
        <b>{project.created_at}</b>
        <span className='inline-block p-1 rounded-sm bg-amber-100 text-amber-700'>{project.status}</span>
      </footer>
    </div>
  )
}
