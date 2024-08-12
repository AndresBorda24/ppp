import View from "../components/view";
import { Form } from "react-router-dom";
import { Icon } from '@iconify-icon/react';
import { AppInput, AppLabel } from "../components/forms";
import { useState } from "react";
import { appFetch } from '../AppFetch'
import { useLoaderData } from "react-router-dom";
import { PaginatedProject } from "../types";

type PaginationProjects = {
  data: PaginatedProject[],
  pagination: Object
}

type LoaderDataType = {
  data: PaginationProjects;
  error: any;
  title: string;
  page: string;
  status: string;
}

export async function loader({ request }) {
  const url = new URL(request.url)
  const title   =  url.searchParams.get('title');
  const page    =  url.searchParams.get('page');
  const status  =  url.searchParams.get('status');

  const { data, error } = await appFetch<PaginationProjects>('GET', {
    url: '/projects', body: null, settings: {
      params: { title, page, status }
    }
  });

  return { data, error, title, page, status }
}

export function ProjectFullList() {
  const { data } = useLoaderData() as LoaderDataType
  const { data: projectList } = data

  return (
    <View title='Todos los proyectos'>
      <div className='flex gap-4'>
        <div className='full-project-list flex-1'>
          {projectList.map((p) => <ProjectCard project={p} key={p.id} />)}
        </div>
        <div className='max-w-sm'>
          <aside className='sticky top-0'>
            <SearchProject />
          </aside>
        </div>
      </div>
    </View>
  )
}


function SearchProject() {
  const { title, status: defaultStatus } = useLoaderData() as LoaderDataType
  const [status, setStatus] = useState(defaultStatus);
  const [order, setOrder] = useState('asc');

  const orders = {
    asc: { icon:  <Icon icon="tabler:sort-ascending-2-filled" /> } ,
    desc: { icon:  <Icon icon="tabler:sort-descending-2-filled" /> }
  }
  const statuses = {
    new: { name: 'Nuevo' },
    pending: { name: 'Pendiente' },
    finish: { name: 'Finalizado' }
  }

  function clearStatus() {
    const checkedStatus = document.querySelector('input[name="status"]:checked');
    if (checkedStatus) (checkedStatus as HTMLInputElement).value = '';
    setStatus('')
  }

  return (
    <section className='rounded border p-3'>
      <h5 className='font-bold text-aso-primary text-lg'>Filtros</h5>
      <Form>
        <AppLabel className='mb-3'>
          Título:
          <AppInput type="search" name='title' placeholder='Proyecto Don quijote' defaultValue={title} />
        </AppLabel>

        <AppLabel>Estado:</AppLabel>
        <div className='bg-neutral-50 flex gap-2 p-2 items-center mb-3'>
          {
            Object.keys(statuses).map((_, index) => (
              <CheckableLabel isChecked={(status === _)} key={index} className="flex-1">
                {statuses[_].name}
                <input
                  type="radio"
                  name="status"
                  value={_}
                  onChange={(e) => setStatus(e.target.value)}
                  className='absolute invisible'
                />
              </CheckableLabel>
            ))
          }
          <button
            type="button"
            onClick={clearStatus}
            className='leading-none'
            title="Limpiar Filtro de Estado"
          > <Icon icon="tdesign:close" /> </button>
        </div>

        <AppLabel>Orden</AppLabel>
        <div className='bg-neutral-50 flex gap-2 p-2'>
          {
            Object.keys(orders).map((key, index) => (
              <CheckableLabel key={index} isChecked={(order === key)} className="flex-1" >
                {orders[key].icon}
                <input
                  type="radio"
                  name="order"
                  value={key}
                  onClick={e => setOrder((e.target as HTMLInputElement).value)}
                  className='absolute invisible'
                />
              </CheckableLabel>
            ))
          }
        </div>
      </Form>
    </section>
  )
}

function CheckableLabel({ isChecked, children, className = '' }) {
  return (
    <label
      className={`block p-2 text-xs text-center text-neutral-600 transition-colors cursor-pointer relative rounded ${className} ${isChecked && 'bg-white shadow'}`}
    > {children} </label>
  );
}

function ProjectCard({ project }: { project: PaginatedProject }) {
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
