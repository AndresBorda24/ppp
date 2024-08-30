import { ActionFunctionArgs } from "react-router-dom"
import View from "../components/view"
import { formatDate } from "../utils"
import { appFetch } from "../AppFetch"
import { useProjectStore } from "../stores/Project"
import { Project as ProjectType } from "../types"
import { SelectPriority } from "../components/Priority"
import { XInput, XTextarea, AppInput } from "../components/forms"

export async function loader({ params }: ActionFunctionArgs) {
  const {data, error} = await appFetch<ProjectType>('GET', {
    url: `/projects/${params.slug}/find`
  })

  if (error) throw error
  if (data === null) throw new Error('Project Not Found.')

  const store = useProjectStore.getState()
  store.rewriteProject(data)

  return null
}

const ProjectView: React.FC = () => {
  const { title, description, started_at, priority, created_at, patchProject } = useProjectStore((state) => ({
    title: state.title,
    description: state.description,
    started_at: state.started_at,
    priority: state.priority,
    created_at: state.created_at,
    patchProject: state.patchProject
  }))

  return (
    <View title={`Visualizando: ${title}`}>
      <section className="max-w-lg">
        <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">Fecha de Creación:</span>
        <span className="block p-1 capitalize">{ formatDate(created_at) }</span>

        <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">Título:</span>
        <XInput
          type="text"
          name="title"
          onChange={e => patchProject('title', e.target.value)}
          onBlur={() => console.log('Esto es lo que ocurre en el onBlur')}
          defaultValue={title}
        > {title} </XInput>

        <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">Descripción:</span>
        <XTextarea
          name="desciption"
          defaultValue={description}
          rows={10}
          onChange={e => patchProject('description', e.target.value)}
          onBlur={() => console.log('Esto es lo que ocurre en el onBlur')}
        > <p className="text-neutral-700">{description}</p> </XTextarea>

        <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">Prioridad</span>
        <SelectPriority priority={priority} setPriority={(p) => patchProject('priority', p)} className="mb-3"/>

        <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">Fecha de Inicio</span>
        <span className="text-neutral-400 text-[10px] inline-block pl-1">(
          Una vez establecida no se podrá cambiar
        )</span>
        {
          started_at
            ? <span className="block p-1 capitalize">{ formatDate(started_at) }</span>
            : ( <AppInput type="date" className="ml-1"/>)
        }
      </section>
    </View>
  )
}

export default ProjectView
