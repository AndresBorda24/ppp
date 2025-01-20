import { BaseButton } from "../button";
import { Task } from "../../types";
import { TaskModalSection } from "./TaskModalSection";
import { useProjectStore } from "../../stores/Project";
import { useState } from "react";
import { useTaskModalStore } from "../../stores/TaskModal";

export const TaskModalManagment: React.FC = () => {
  const [show, setShow] = useState(false);
  const { removeTask } = useProjectStore()
  const { task, prevTask, setPrevTask, openModal, closeModal } = useTaskModalStore();

  const handleDelete = () => {
    if (task.detail_type ==="sub_task") {
      openModal(prevTask);
      setPrevTask(undefined);
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
        <span className="text-gray-500 px-2 text-xs">(Eliminar)</span>
      }
    >
      <div
        className={`rounded p-5 grid place-content-center bg-red-50 transition-all duration-300 relative ${
          show ? "bg-red-100 shadow-md" : ""
        }`}
      >
        <div>
          <p className="text-center text-red-950 text-xs min-h-16">
            <span className="text-red-700 font-bold text-base">¡Eliminar!</span>
            <br />
            Al eliminar un item también se eliminarán todos los comentarios
            asociados. Esta acción no se puede restablecer.
          </p>
          <div className="flex items-center justify-center gap-5">
            <BaseButton
              color="free"
              onClick={() => setShow(!show)}
              className="italic underline underline-offset-2 text-sm text-red-900 hover:text-red-950"
            >
              {show ? "Cancelar" : "Click para continuar"}
            </BaseButton>
            {show ? <BaseButton color="red" onClick={handleDelete}>Eliminar</BaseButton> : null}
          </div>
        </div>
      </div>
    </TaskModalSection>
  );
};
