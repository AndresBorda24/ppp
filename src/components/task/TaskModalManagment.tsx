import { DeleteItem } from "../DeleteItem";
import { Task } from "../../types";
import { TaskModalSection } from "./TaskModalSection";
import { useProjectStore } from "../../stores/Project";
import { useRef } from "react";
import { useTaskModalStore } from "../../stores/TaskModal";

export const TaskModalManagment: React.FC = () => {
  const infoEl = useRef<HTMLElement>(null);
  const { removeTask } = useProjectStore();
  const { task, prevTask, setPrevTask, openModal, closeModal } = useTaskModalStore();

  const handleDeleted = async () => {
    if (task.detail_type ==="sub_task") {
      openModal(prevTask);
      setPrevTask(undefined);
      (infoEl.current?.previousElementSibling as HTMLElement).click()
    } else if (task.detail_type === "task") {
      removeTask(task as Task);
      closeModal();
    }
  }

  if (!task || !task.id) return;

  return (
    <TaskModalSection
      title="Administración"
      closedByDefault
      topChildren={
        <span className="text-gray-500 px-2 text-xs" ref={infoEl}>(Eliminar)</span>
      }
    >
      <DeleteItem
        itemId={task.detail_id}
        type={task.detail_type}
        onDeleted={handleDeleted}
      />
    </TaskModalSection>
  );
};
