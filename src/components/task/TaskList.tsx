import { Task as TaskType, SubTask as SubTaskType } from "../../types"
import { UpdateTaskStateButton } from "./UpdateTaskStateButton"

interface TaskItemProps {
  item: TaskType|SubTaskType,
  className?: string,
  onUpdated: (item: TaskType|SubTaskType ) => void,
  onClick?: () => void
}
export const TaskItem: React.FC<TaskItemProps> = ({ item, className = "", onClick, onUpdated }) => {
  return (
    <div role="listitem" className={`flex text-neutral-800 gap-2 px-1 ${className}`}>
      <UpdateTaskStateButton
        item={item}
        onUpdated={onUpdated}
      />
      {/* Sinceramente no sé porque o como funciona el w-0 pero da el efecto deseado */}
      <div className={`flex flex-col flex-1 max-w-full w-0 ${item.status === 'finished' && 'line-through opacity-50'}`}>
        <button type="button" onClick={() => onClick ? onClick() : null} className="text-sm text-left text-neutral-600">{item.title}</button>
        {item.description && (
          <span className="text-xs text-neutral-500 text-nowrap text-ellipsis overflow-hidden">{item.description}</span>
        )}
      </div>
    </div>
  )
}

// interface TaskListProps { className?: string }
// export const TaskList: React.FC<TaskListProps> = ({ className = '' }) => {
//   const { tasks } = useProjectStore()
//   const [showCompleted, setShowCompleted] = useState(false)
//   const [search, setSearch] = useState('')
//   const [debouncedSearch] = useDebounce(search, 300)
//   const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([])
//   const { openModal } = useTaskModalStore()

//   useEffect(() => {
//     const x = debouncedSearch.toLowerCase()
//     const newTasks = tasks
//       .filter(t => showCompleted || t.status !== 'finished')
//       .filter(t => t.title
//         .toLowerCase()
//         .concat(t.description?.toLowerCase() ?? '')
//         .includes(x)
//       )
//     setFilteredTasks(newTasks)
//   },[debouncedSearch, tasks, showCompleted])

//   return (
//     <div className="w-full relative">
//       <header className="mb-2">
//         <h5 className="text-aso-secondary font-bold text-base mb-1">Tareas</h5>
//         <div className="absolute top-0 right-0 text-xs flex itemx-center gap-2">
//           <button
//             className="px-2 py-0.5 rounded bg-blue-50 text-blue-500 focus-within:outline-1 focus:outline-dotted outline-gray-400 outline-offset-2 hover:shadow-inner flex items-center"
//             onClick={() => openModal()}
//           > <Icon icon="material-symbols-light:add" className="text-base" /> Nueva Tarea</button>
//           <button
//             className="px-2 py-0.5 rounded bg-green-50 text-green-500 focus-within:outline-1 focus:outline-dotted outline-gray-400 outline-offset-2 hover:shadow-inner flex items-center"
//             onClick={() => setShowCompleted(!showCompleted)}
//           > { showCompleted ? 'Ocultar' : 'Mostrar' } Completadas </button>
//         </div>
//         <AppInput
//           type="search"
//           defaultValue={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Terminar el filtrado de tareas"
//         />
//       </header>
//       {
//         (filteredTasks.length === 0)
//           ? <span>Aún no hay tareas para este Proyecto.</span>
//           : (
//             <div role="list" className={`flex flex-col overflow-auto ${className}`}>
//               {
//                 filteredTasks.map(task => <TaskItem task={task} key={task.detail_id} />)
//               }
//             </div>
//           )
//       }
//     </div>
//   )
// }
