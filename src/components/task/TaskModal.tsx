import { Icon } from "@iconify-icon/react"
import { useTaskModalStore } from "../../stores/TaskModal"
import { TaskUpdateForm } from "./TaskUpdateForm"
import { TaskCreateForm } from "./TaskCreateForm"
import { updateTask } from "../../requests/tasks-requests"
import { useProjectStore } from "../../stores/Project"
import { TaskModalSection } from "./TaskModalSection"
import { TaskModalSubtaskList } from "./TaskModalSubtaskList"

export const TaskModal: React.FC = () => {
  const { open, closeModal, task, patchTask } = useTaskModalStore()
  const { patchTask: patchTaskFromList } = useProjectStore()
  if (! open) return;

  function onSubmitUpdate() {
    const currentTask = {...task};
    patchTaskFromList(task);
    updateTask(task).then((value) => {
      if (value.error) {
        patchTaskFromList(currentTask);
      }
    });
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black/50 grid place-content-center overflow-y-auto z-20">
      <div className="bg-white rounded-md overflow-hidden w-screen h-screen h-[100dvh] md:max-h-[90vh] max-w-[450px] flex flex-col">
        <header className="p-1 border-neutral-200 border-b">
          <button onClick={closeModal} className="ml-auto p-2 hover:bg-neutral-200 text-neutral-700 grid place-content-center rounded">
            <Icon icon='material-symbols:close'/>
          </button>
        </header>
        <div className="px-5 py-4 flex-grow overflow-auto">
          {
            Boolean(task.detail_id)
            ? <TaskUpdateForm item={task} onSubmit={() => onSubmitUpdate()} patch={patchTask} />
            : <TaskCreateForm item={task} onSubmit={() => {}} patch={patchTask} onCancel={closeModal} />
          }
          <TaskModalSubtaskList />
        </div>
        <footer>
          { Boolean(task.id) ? (
            <div className="bg-amber-50 text-amber-950 p-2 grid text-xs grid-cols-2 border-t border-neutral-300 border-dashed">
              <div className="grid">
                <span className="font-bold">Fecha Creación:</span>
                <span>{task.created_at}</span>
              </div>
              <div className="grid">
                <span className="font-bold">Ultima Actualización:</span>
                <span>{task.updated_at}</span>
              </div>
            </div>
          ) : null }
        </footer>
      </div>
    </div>
  );
}
