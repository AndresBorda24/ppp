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
    <div role="listitem" className={`flex text-neutral-800 gap-2 px-1 items-center ${className}`}>
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
