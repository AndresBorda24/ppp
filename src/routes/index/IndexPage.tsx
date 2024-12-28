import View from "../../components/view";
import { ProjectCard } from "../../components/ProjectCard";
import { ProjectFilters } from "../../components/ProjectsFilters";
import { useLoaderData } from "react-router-dom";
import { IndexloaderDataType } from "../../types";

export const IndexPage:  React.FC = () => {
  const { data, title, order, status, amount } = useLoaderData() as IndexloaderDataType
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
