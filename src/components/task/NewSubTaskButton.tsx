import { Icon } from "@iconify-icon/react"
import { useTaskModalStore } from "../../stores/TaskModal"
import { SubTask, Task } from "../../types"
import { getCurrentDateTime } from "../../utils"

export const NewSubTaskButton: React.FC = () => {
  const { task, openModal, setPrevTask } = useTaskModalStore()

  const baseSubTask: SubTask = {
      id: 0,
      detail_id: 0,
      task_id: 0,
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
      className="text-green-950 leading-none p-0.5"
    >
      <Icon icon={'ic:baseline-plus'} />
    </button>
  )
}
