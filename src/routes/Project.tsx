import { ActionFunctionArgs } from "react-router-dom"
import View from "../components/view"
import { formatDate } from "../utils"
import { appFetch } from "../AppFetch"
import { useProjectStore } from "../stores/Project"
import { Project as ProjectType } from "../types"
import { SelectPriority } from "../components/Priority"
import { HelperDates } from "../components/HelperDates"
import { XInput, XTextarea, AppInput } from "../components/forms"
import { useEffect } from "react"
import { toast } from "sonner"

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

async function updateProjectRequest({ id, body }: {id: number, body: any}) {
  await appFetch<ProjectType>('PATCH', { url: `/projects/${id}/patch`, body })
}

const ProjectView: React.FC = () => {
  const {
    id,
    title,
    description,
    started_at,
    priority,
    created_at,
    due_date,
    patchProject
  } = useProjectStore((state) => state)

  const setStartedAt = () => {
    const input = document.querySelector('#project-form [name="started_at"]') as HTMLInputElement
    const date  = input?.value

    if (! Boolean(date)) {
      toast.warning("No has establecido una Fecha de Inicio.")
      input?.focus()
      return
    }

    patchProject('started_at', date)
    updateProjectRequest({id, body: { started_at: date }})
  }

  useEffect(() => {
    updateProjectRequest({id, body: { priority, due_date }})
    const selectDueDate = document.querySelector('#project-form [name="due_date"]')

    if (due_date && selectDueDate) {
      (selectDueDate as HTMLInputElement).value = due_date
    }
  }, [priority, due_date])

  return (
    <View title={`Visualizando: ${title}`}>
      <section className="max-w-lg">
        <form onSubmit={(e) => e.preventDefault()} id="project-form">
          <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">Fecha de Creación:</span>
          <span className="block p-1 capitalize">{ formatDate(created_at) }</span>

          <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">Título:</span>
          <XInput
            type="text"
            name="title"
            onChange={e => patchProject('title', e.target.value)}
            onBlur={() => updateProjectRequest({id, body: { title }})}
            defaultValue={title}
          > {title} </XInput>

          <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">Descripción:</span>
          <XTextarea
            name="desciption"
            defaultValue={description}
            rows={10}
            onChange={e => patchProject('description', e.target.value)}
            onBlur={() => updateProjectRequest({id, body: { description }})}
          > <p className="text-neutral-700 whitespace-break-spaces">{description}</p> </XTextarea>

          <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">Prioridad</span>
          <SelectPriority priority={priority} setPriority={(p) => patchProject('priority', p)} className="mb-3"/>

          <div className="grid sm:grid-cols-2 gap-2 items-end">
            <div>
              <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">
                Fecha de Inicio
                { !started_at && <span className="text-neutral-400 text-[10px] font-normal pl-1">(Una vez establecida no se podrá cambiar)</span>}
              </span>
              {
                started_at
                  ? <span className="block p-1 capitalize">{ formatDate(started_at) }</span>
                  : (
                    <div className="flex gap-1 items-center">
                      <AppInput
                        type="date"
                        name="started_at"
                        className="ml-1 flex-1"
                        max={(new Date()).toJSON().substring(0, 10)}
                      />
                      <button
                        type="button"
                        onClick={() => setStartedAt()}
                        title="Establecer Fecha de Inicio"
                        className="text-[.6rem] px-1.5 py-0.5 rounded-md transition-colors duration-150 hover:bg-neutral-200 hover:shadow-lg"
                      >✔</button>
                    </div>
                  )
              }
            </div>
            <div>
              <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">Fecha de finalización estimada:</span>
              <div className="flex gap-1 items-center">
                <AppInput type="date" className="ml-1" defaultValue={due_date} name="due_date" />
                <SelectDateHelper date={due_date || null} setDate={(d => patchProject('due_date', d))} />
              </div>
            </div>
          </div>
        </form>
      </section>
    </View>
  )
}

interface SelectDateHelperProps { date: string|null; setDate: (d: string) => void }
const SelectDateHelper: React.FC<SelectDateHelperProps> = ({ date = null, setDate }) => {
  return (
    <details className="relative">
      <summary className="list-none h-4 rounded-full bg-neutral-800 text-neutral-300 inline-grid leading-none place-content-center aspect-square cursor-pointer select-none">&bull;</summary>
      <HelperDates
        defaultDate={date}
        setDate={setDate}
        className="absolute bg-neutral-50 p-2 rounded shadow-lg bottom-full right-0 border border-neutral-200 outline outline-offset-1 outline-1 outline-neutral-300"
      />
    </details>
  )
}

export default ProjectView
