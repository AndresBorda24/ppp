import View from "../components/view.tsx";
import { Icon } from '@iconify-icon/react';
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
  amount: string;
}

export async function loader({ request }: ActionFunctionArgs ) {
  const url = new URL(request.url)
  const title  = url.searchParams.get('title');
  const page   = url.searchParams.get('page');
  const order  = url.searchParams.get('order') ?? 'asc';
  const status = url.searchParams.get('status');
  const amount = url.searchParams.get('amount') ?? '10';

  const { data, error } = await appFetch<PaginationProjects>('GET', {
    url: '/projects', body: null, settings: {
      params: { title, page, status, amount }
    }
  });

  return { data, error, title, page, status, order, amount }
}

export const ProjectFullList: React.FC = () => {
  const { data, title, order, status, amount } = useLoaderData() as LoaderDataType
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
              amount={amount}
              pagination={data.pagination}
            />
          </aside>
        </div>
      </div>
    </View>
  )
}

interface ProjectCardProps { project: PaginatedProject }
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const description = project.description?.substring(0, 200)

  return (
    <a
      href="#"
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
    </a>
  )
}
