import { BasicInput, BasicTextarea } from "../forms";
import { SubTask, Task } from "../../types";

import { BaseButton } from "../button";
import { SelectPriority } from "../Priority";
import { useEffect } from "react";

interface Props {
  onSubmit: () => void;
  onCancel?: () => void;
  patch: (key: keyof Task, value: unknown) => void;
  item: Task | SubTask;
}
export const TaskUpdateForm: React.FC<Props> = ({
  item,
  patch,
  onSubmit,
  onCancel,
}) => {
  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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

    onSubmit();
    (document.activeElement as HTMLElement)?.blur();
  }

  useEffect(() => {
    const title = document.getElementById(
      "create-item-title"
    ) as HTMLInputElement;
    const desc = document.getElementById(
      "create-item-description"
    ) as HTMLTextAreaElement;
    if (title) title.value = item.title;
    if (desc) {
      desc.value = item.description ?? "";
      // Esto es para que el textarea tome el auto adecuado
      desc.dispatchEvent(
        new Event("input", { bubbles: true, cancelable: true })
      );
    }
  }, [item.id]);

  return (
    <form
      onSubmit={onFormSubmit}
      id="task-form"
      autoComplete="off"
      className="group relative focus-within:outline-offset-8 focus-within:outline-dotted focus-within:outline-2 focus-within:rounded-sm focus-within:outline-neutral-300"
    >
      <BasicInput
        required
        type="text"
        id="create-item-title"
        name="item-title"
        placeholder="Titulo De la Tarea"
        defaultValue={item.title}
        className="text-xl text-neutral-800 font-bold w-full"
        onChange={(e) => patch("title", e.target.value.trim())}
      />
      <BasicTextarea
        name="item-description"
        id="create-item-description"
        placeholder="Descripción de la Tarea"
        className="text-sm text-neutral-800 w-full mb-1 resize-none"
        defaultValue={item.description}
        onChange={(e) => patch("description", e.target.value)}
      />

      <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">
        {" "}
        Prioridad{" "}
      </span>
      <SelectPriority
        priority={item.priority}
        setPriority={(p) => patch("priority", p)}
        className="!border-none py-1 !bg-transparent"
      />
      <div className="justify-end pt-2 mt-3 gap-2 hidden group-focus-within:flex">
        {onCancel ? (
          <BaseButton
            color="free"
            type="button"
            className="bg-neutral-700 text-white hover:bg-neutral-900 transition-colors duration-150 focus:ring-neutral-500"
            onClick={onCancel}
          >
            Cancelar
          </BaseButton>
        ) : null}
        <BaseButton color="secondary" type="submit">
          Guardar
        </BaseButton>
      </div>

      {item.author_name ? (
        <div className="mb-2 mt-4">
          <p className="m-0 text-xs italic text-neutral-500">
            <span className="font-bold">Autor:</span>&nbsp;
            <span>{item.author_name}</span>
          </p>
        </div>
      ) : null}
    </form>
  );
};
