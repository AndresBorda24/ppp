import { useEffect, useState } from "react"
import { Task as TaskType } from "../../types"
import { useProjectStore } from "../../stores/Project"
import { Icon } from "@iconify-icon/react"
import { AppInput } from "../forms"
import { useDebounce } from "use-debounce"
import { patchTask as patchTaskRequest } from "../../requests/tasks-requests"
import { useTaskModalStore } from "../../stores/TaskModal"

interface TaskItemProps {
  task: TaskType,
  className?: string
}
export const TaskItem: React.FC<TaskItemProps> = ({ task, className = "" }) => {
  const { openModal } = useTaskModalStore()
  const { patchTask } = useProjectStore()
  function switchStatus() {
    task.status = (task.status === 'finished')
      ? 'process'
      : 'finished';
    patchTask(task);
    patchTaskRequest({ id: task.detail_id, body: { status: task.status }});
  }

  return (
    <div role="listitem" className={`flex text-neutral-800 gap-2 px-1 pt-2 pb-1 ${className} border-t`}>
      <button onClick={switchStatus} type="button" className={`group flex h-4 w-4 flex-shrink-0 rounded-full border cursor-pointer transition-colors duration-150 mt-1 ${(task.status === 'finished')
        ? 'bg-neutral-500/20 border-neutral-500'
        : 'bg-aso-primary/10 border-aso-primary'
        }`}>
        <Icon
          icon="material-symbols:check"
          className="m-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        />
      </button>
      {/* Sinceramente no sé porque o como funciona el w-0 pero da el efecto deseado */}
      <div className={`flex flex-col flex-1 max-w-full w-0 gap-1 ${task.status === 'finished' && 'line-through opacity-50'}`}>
        <button type="button" onClick={() => openModal(task)} className="text-sm text-left">{task.title}</button>
        {task.description && (
          <span className="text-xs text-neutral-500 text-nowrap text-ellipsis overflow-hidden">{task.description}</span>
        )}
      </div>
    </div>
  )
}

interface TaskListProps { className?: string }
export const TaskList: React.FC<TaskListProps> = ({ className = '' }) => {
  const { tasks } = useProjectStore()
  const [showCompleted, setShowCompleted] = useState(false)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 300)
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([])
  const { openModal } = useTaskModalStore()

  useEffect(() => {
    const x = debouncedSearch.toLowerCase()
    const newTasks = tasks
      .filter(t => showCompleted || t.status !== 'finished')
      .filter(t => t.title
        .toLowerCase()
        .concat(t.description?.toLowerCase() ?? '')
        .includes(x)
      )
    setFilteredTasks(newTasks)
  },[debouncedSearch, tasks, showCompleted])

  return (
    <div className="w-full relative">
      <header className="mb-2">
        <h5 className="text-aso-secondary font-bold text-base mb-1">Tareas</h5>
        <div className="absolute top-0 right-0 text-xs flex itemx-center gap-2">
          <button
            className="px-2 py-0.5 rounded bg-blue-50 text-blue-500 focus-within:outline-1 focus:outline-dotted outline-gray-400 outline-offset-2 hover:shadow-inner flex items-center"
            onClick={() => openModal()}
          > <Icon icon="material-symbols-light:add" className="text-base" /> Nueva Tarea</button>
          <button
            className="px-2 py-0.5 rounded bg-green-50 text-green-500 focus-within:outline-1 focus:outline-dotted outline-gray-400 outline-offset-2 hover:shadow-inner flex items-center"
            onClick={() => setShowCompleted(!showCompleted)}
          > { showCompleted ? 'Ocultar' : 'Mostrar' } Completadas </button>
        </div>
        <AppInput
          type="search"
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Terminar el filtrado de tareas"
        />
      </header>
      {
        (filteredTasks.length === 0)
          ? <span>Aún no hay tareas para este Proyecto.</span>
          : (
            <div role="list" className={`flex flex-col overflow-auto ${className}`}>
              {
                filteredTasks.map(task => <TaskItem task={task} key={task.detail_id} />)
              }
            </div>
          )
      }
    </div>
  )
}
