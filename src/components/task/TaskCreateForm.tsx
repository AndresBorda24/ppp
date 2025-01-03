import { SubTask, Task } from "../../types";
import { BasicInput, BasicTextarea } from "../forms";
import { SelectPriority } from "../Priority";
import { BaseButton } from "../button";

interface Props {
  onSubmit: () => void,
  onCancel?: () => void,
  patch: (key: keyof Task, value: unknown) => void,
  item: Task | SubTask
}
export const TaskCreateForm: React.FC<Props> = ({ item, patch, onSubmit, onCancel }) => {
  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // @ts-ignore
    const titleInput: HTMLInputElement|null = document.getElementById('create-item-title');
    if (titleInput) {
      titleInput.value = item.title;
    }

    if (! e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    onSubmit();
  }

  return (
    <form onSubmit={onFormSubmit} id="task-form" autoComplete="off">
      <BasicInput
        required
        type="text"
        id="create-item-title"
        name="item-title"
        placeholder="Titulo De la Tarea"
        className="text-xl text-neutral-800 font-bold w-full"
        onChange={(e) => patch('title', e.target.value.trim())}
      />
      <BasicTextarea
        name="item-description"
        placeholder="Descripción de la Tarea"
        className="text-sm text-neutral-800 w-full mb-1 resize-none"
        onChange={(e) => patch('description', e.target.value)}
      />

      <span
        className="text-neutral-400 font-bold text-[10px] inline-block pl-1"
      > Prioridad </span>
      <SelectPriority
        priority={item.priority}
        setPriority={(p) => patch('priority', p)}
        className="!border-none py-1 !bg-transparent"
      />
      <div className="flex justify-end pt-2 mt-3 gap-2">
        {
          onCancel
            ? (<BaseButton
              color="free"
              type="button"
              className="bg-neutral-700 text-white hover:bg-neutral-900 transition-colors duration-150 focus:ring-neutral-500"
              onClick={onCancel}
            >Cancelar</BaseButton>)
            : null
        }
        <BaseButton color="secondary" type="submit">Guardar</BaseButton>
      </div>
    </form>
  );
};
