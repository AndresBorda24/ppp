import { useTaskModalStore } from "../../stores/TaskModal"
import { TaskUpdateForm } from "./TaskUpdateForm"
import { TaskCreateForm } from "./TaskCreateForm"
import { createTask, updateTask } from "../../requests/tasks-requests"
import { useProjectStore } from "../../stores/Project"
import { TaskModalSubtaskList } from "./TaskModalSubtaskList"
import { TaskModalFooter } from "./TaskModalFooter"
import { TaskModalHeader } from "./TaskModalHeader"
import { Task } from "../../types"

export const TaskModal: React.FC = () => {
  const { open, closeModal, task, patchTask, openModal } = useTaskModalStore()
  const { patchTask: patchTaskFromList, id: projectId, addNewTask } = useProjectStore()
  if (! open) return;

  function onSubmitUpdate() {
    const currentTask = {...task};
    if (task.detail_type === 'task') {
      patchTaskFromList(task as Task);
      updateTask(task as Task).then((value) => {
        if (value.error) {
          patchTaskFromList(currentTask as Task);
        }
      });
    }
  }

  function onSubmitCreate() {
    if (task.detail_type === 'task') {
      (task as Task).project_id = projectId;
      createTask(task as Task).then((data) => {
        if (data.data) {
          addNewTask(data.data);
          openModal(data.data);
        }
      });
    }
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black/50 grid place-content-center overflow-y-auto z-20">
      <div className="bg-white rounded-md overflow-hidden w-screen h-screen h-[100dvh] md:max-h-[90vh] max-w-[450px] flex flex-col">
        <TaskModalHeader />
        <div className="px-5 py-4 flex-grow overflow-auto">
          {
            Boolean(task.detail_id)
            ? <TaskUpdateForm item={task} onSubmit={() => onSubmitUpdate()} patch={patchTask} />
            : <TaskCreateForm item={task} onSubmit={() => onSubmitCreate()} patch={patchTask} onCancel={closeModal} />
          }
          <TaskModalSubtaskList />
        </div>
        <TaskModalFooter item={task} />
      </div>
    </div>
  );
}
