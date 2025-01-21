import { BaseButton } from "../button";
import { Task } from "../../types";
import { TaskModalSection } from "./TaskModalSection";
import { deleteTaskOrSubTask } from "../../requests/tasks-requests";
import { toast } from "sonner";
import { useProjectStore } from "../../stores/Project";
import { useState } from "react";
import { useTaskModalStore } from "../../stores/TaskModal";

export const TaskModalManagment: React.FC = () => {
  const [show, setShow] = useState(false);
  const [removing, setRemoving] = useState(false);
  const { removeTask } = useProjectStore();
  const { task, prevTask, setPrevTask, openModal, closeModal } = useTaskModalStore();

  const handleDelete = async () => {
    if (!task || !task.id) return;

    setRemoving(true);
    const deleted = await deleteTaskOrSubTask(task);
    setRemoving(false);

    if (!deleted) return;

    if (task.detail_type ==="sub_task") {
      openModal(prevTask);
      setPrevTask(undefined);
    } else if (task.detail_type === "task") {
      removeTask(task as Task);
      closeModal();
    }

    setShow(false);
    toast.success("Item eliminado correctamente");
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
        className={`rounded p-5 grid place-content-center transition-all duration-300 relative ${
          show ? "bg-red-100 shadow-md" : "bg-red-50"
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

        { removing ? (
          <div className="absolute inset-0 bg-white/90 grid place-content-center">
            <span className="font-bold">Eliminando...</span>
          </div>
        ) : null }
      </div>
    </TaskModalSection>
  );
};
