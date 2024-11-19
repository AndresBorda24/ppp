import { Icon } from "@iconify-icon/react"
import { useTaskModalStore } from "../../stores/TaskModal"
import { SubTask, Task } from "../../types"
import { getCurrentDateTime } from "../../utils"

interface Props {
  taskId: number
}
export const NewSubTaskButton: React.FC<Props> = ({ taskId }) => {
  const { task, openModal, setPrevTask } = useTaskModalStore()

  const baseSubTask: SubTask = {
      id: 0,
      detail_id: 0,
      task_id: taskId,
      detail_type: 'sub_task',
      created_at: getCurrentDateTime(),
      created_by_id: 0,
      priority: 'normal',
      status: 'new',
      title: '',
      description: ''
  };

  function handleOnClick() {
    if (task) {
      setPrevTask({... task} as Task);
    }

    openModal(baseSubTask);
  }

  return (
    <button
      onClick={handleOnClick}
      title="Nueva SubTarea"
      className="text-green-950 leading-none p-0.5 hover:bg-green-100 rounded transition-colors duration-100"
    > <Icon icon={'ic:baseline-plus'} /> </button>
  )
}
