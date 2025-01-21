import { TaskCreateForm } from "./TaskCreateForm"
import { TaskModalComments } from "./TaskModalComments"
import { TaskModalFooter } from "./TaskModalFooter"
import { TaskModalHeader } from "./TaskModalHeader"
import { TaskModalManagment } from "./TaskModalManagment"
import { TaskModalMobileComments } from "./TaskModalMobileComments"
import { TaskModalSubtaskList } from "./TaskModalSubtaskList"
import { TaskUpdateForm } from "./TaskUpdateForm"
import { useTaskModalStore } from "../../stores/TaskModal"

export const TaskModal: React.FC = () => {
  const { open, closeModal, task, patchTask } = useTaskModalStore()
  if (! open) return;

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black/50 flex justify-center md:items-center overflow-y-auto z-20">
      <TaskModalComments />
      <div className="bg-white rounded-md overflow-hidden w-screen h-dvh md:max-h-[90vh] max-w-[450px] flex flex-col shadow">
        <TaskModalHeader />
        <div className="px-5 py-4 flex-grow overflow-auto">
          {
            Boolean(task.detail_id)
            ? <TaskUpdateForm item={task} patch={patchTask} />
            : <TaskCreateForm item={task} patch={patchTask} onCancel={closeModal} />
          }
          <TaskModalSubtaskList />
          <TaskModalMobileComments />
          <TaskModalManagment />
        </div>
        <TaskModalFooter item={task} />
      </div>
    </div>
  );
}
