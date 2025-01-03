import { useTaskModalStore } from "../../stores/TaskModal"
import { TaskUpdateForm } from "./TaskUpdateForm"
import { TaskCreateForm } from "./TaskCreateForm"
import { createSubTask, createTask, updateTask, updateSubTask } from "../../requests/tasks-requests"
import { useProjectStore } from "../../stores/Project"
import { TaskModalSubtaskList } from "./TaskModalSubtaskList"
import { TaskModalFooter } from "./TaskModalFooter"
import { TaskModalHeader } from "./TaskModalHeader"
import { SubTask, Task } from "../../types"
import { TaskModalMobileComments } from "./TaskModalMobileComments"
import { TaskModalComments } from "./TaskModalComments"
import { useUserInfo } from "../../hooks/useUserInfo"

export const TaskModal: React.FC = () => {
  const { open, closeModal, task, patchTask, openModal } = useTaskModalStore()
  const { patchTask: patchTaskFromList, id: projectId, addNewTask } = useProjectStore()
  const { user } = useUserInfo();

  if (! open) return;

  function onSubmitUpdate() {
    if (task.detail_type === 'task') {
      patchTaskFromList(task as Task);
      updateTask(task as Task).then((value) => {
        if (value.error) {
          patchTaskFromList(task as Task);
        }
      });
    }

    if (task.detail_type === 'sub_task') {
      updateSubTask(task as SubTask);
    }
  }

  function onSubmitCreate() {
    task.created_by_id = user.id;
    if (task.detail_type === 'task') {
      (task as Task).project_id = projectId;
      createTask(task as Task).then((data) => {
        if (data.data) {
          addNewTask(data.data);
          openModal(data.data);
        }
      });
    }

    if (task.detail_type === 'sub_task') {
      createSubTask(task as SubTask).then((data) => {
        if (data.data) {
          openModal(data.data);
        }
      });
    }
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black/50 flex  justify-center items-center overflow-y-auto z-20">
      <TaskModalComments />
      <div className="bg-white rounded-md overflow-hidden w-screen h-screen h-[100dvh] md:max-h-[90vh] max-w-[450px] flex flex-col shadow">
        <TaskModalHeader />
        <div className="px-5 py-4 flex-grow overflow-auto">
          {
            Boolean(task.detail_id)
            ? <TaskUpdateForm item={task} onSubmit={() => onSubmitUpdate()} patch={patchTask} />
            : <TaskCreateForm item={task} onSubmit={() => onSubmitCreate()} patch={patchTask} onCancel={closeModal} />
          }
          <TaskModalSubtaskList />
          <TaskModalMobileComments />
        </div>
        <TaskModalFooter item={task} />
      </div>
    </div>
  );
}
