import { Icon } from "@iconify-icon/react"
import { useTaskModalStore } from "../../stores/TaskModal"
import { TaskUpdateForm } from "./TaskUpdateForm"
import { TaskCreateForm } from "./TaskCreateForm"

export const TaskModal: React.FC = () => {
  const { open, closeModal, task, patchTask } = useTaskModalStore()
  if (! open) return;

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black/50 grid place-content-center overflow-y-auto z-20">
      <div className="bg-white rounded-md overflow-hidden w-[98vw] max-w-[450px]">
        <header className="p-1 border-neutral-200 border-b">
          <button onClick={closeModal} className="ml-auto p-2 hover:bg-neutral-200 text-neutral-700 grid place-content-center rounded">
            <Icon icon='material-symbols:close'/>
          </button>
        </header>
        <div className="px-3 py-1">
          {
            Boolean(task.detail_id)
            ? <TaskUpdateForm item={task} onSubmit={() => {}} patch={patchTask} onCancel={closeModal} />
            : <TaskCreateForm item={task} onSubmit={() => {}} patch={patchTask} onCancel={closeModal} />
          }
        </div>
      </div>
    </div>
  );
}
