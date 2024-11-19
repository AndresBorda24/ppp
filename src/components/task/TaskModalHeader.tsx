import { Icon } from "@iconify-icon/react"
import { useTaskModalStore } from "../../stores/TaskModal"
import { UpdateTaskStateButton } from "./UpdateTaskStateButton";
import { useProjectStore } from "../../stores/Project";

export const TaskModalHeader: React.FC = () => {
  const { task, closeModal, prevTask, openModal, setPrevTask, patchTask } = useTaskModalStore()
  const { patchTask: patchTaskFromList } = useProjectStore()

  function openPrev() {
    openModal(prevTask);
    setPrevTask(undefined);
  }

  return (
    <header className="p-1 border-neutral-200 border-b flex gap-2 justify-end items-center">
      {
        Boolean(prevTask) ? (
          <button
            onClick={openPrev}
            className="p-2 hover:bg-neutral-200 text-neutral-700 grid place-content-center rounded mr-auto"
          > <Icon icon='mingcute:left-fill'/> </button>
        ) : null
      }
      { Boolean(task.id) ? (
        <div className="flex items-center gap-2 flex-grow">
            <UpdateTaskStateButton
              item={task}
              onUpdated={(item) => {
                patchTask('status', item.status);
                if (item.detail_type === 'task') patchTaskFromList(task);
              }}
            />
          <div className="flex flex-col">
            <span className="text-neutral-400 text-xs">{task.detail_type === "task" ? 'Tarea' : 'Sub Tarea'}</span>
            <span className="text-neutral-500 text-xs">{task.title}</span>
          </div>
        </div>
      ) : null }
      <button
        onClick={closeModal}
        className="p-2 hover:bg-neutral-200 text-neutral-700 grid place-content-center rounded"
      > <Icon icon='material-symbols:close'/> </button>
    </header>

  );
}
