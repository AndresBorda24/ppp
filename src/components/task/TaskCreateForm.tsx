import { BasicInput, BasicTextarea } from "../forms";
import { SubTask, Task } from "../../types";
import { createSubTask, createTask } from "../../requests/tasks-requests";

import { BaseButton } from "../button";
import { SelectPriority } from "../Priority";
import { useProjectStore } from "../../stores/Project";
import { useState } from "react";
import { useTaskModalStore } from "../../stores/TaskModal";
import { useUserInfo } from "../../hooks/useUserInfo";

interface Props {
  onCancel?: () => void;
  patch: (key: keyof Task, value: unknown) => void;
  item: Task | SubTask;
}
export const TaskCreateForm: React.FC<Props> = ({
  item,
  patch,
  onCancel,
}) => {
  const [saving, setSaving] = useState(false);
  const { id: projectId, addNewTask } = useProjectStore();
  const { openModal } = useTaskModalStore();
  const { user } = useUserInfo();

  const createItem = async () => {
    item.created_by_id = user.id;
    const isTask = (item.detail_type === 'task');
    if (isTask) (item as Task).project_id = projectId;

    const newItem = isTask
      ? await createTask(item as Task)
      : await createSubTask(item as SubTask);

    if (newItem) {
      newItem.author_name = user.nombre;
      openModal(newItem);
      isTask && addNewTask(newItem as Task);
    }
  }

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;

    // @ts-ignore
    const titleInput: HTMLInputElement | null =
      document.getElementById("create-item-title");
    if (titleInput) {
      titleInput.value = item.title;
    }

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    setSaving(true);
    createItem().finally(() => setSaving(false));
  }

  return (
    <form onSubmit={onFormSubmit} id="task-form" autoComplete="off">
      <BasicInput
        required
        autoFocus
        type="text"
        id="create-item-title"
        name="item-title"
        placeholder="Titulo De la Tarea"
        className="text-xl text-neutral-800 font-bold w-full"
        onChange={(e) => patch("title", e.target.value.trim())}
      />
      <BasicTextarea
        name="item-description"
        placeholder="Descripción de la Tarea"
        className="text-sm text-neutral-800 w-full mb-1 resize-none"
        onChange={(e) => patch("description", e.target.value)}
      />

      <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">Prioridad</span>
      <SelectPriority
        priority={item.priority}
        setPriority={(p) => patch("priority", p)}
        className="!border-none py-1 !bg-transparent"
      />
      <div className="flex justify-end pt-2 mt-3 gap-2">
        {onCancel ? (
          <BaseButton
            color="free"
            type="button"
            disabled={saving}
            className="bg-neutral-700 text-white hover:bg-neutral-900 transition-colors duration-150 focus:ring-neutral-500"
            onClick={onCancel}
          >
            Cancelar
          </BaseButton>
        ) : null}
        <BaseButton color="secondary" type="submit" disabled={saving}>
          { saving ? 'Creando...' : 'Guardar'}
        </BaseButton>
      </div>
    </form>
  );
};
