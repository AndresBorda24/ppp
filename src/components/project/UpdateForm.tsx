import { AppInput, XInput, XTextarea } from "../../components/forms";

import { SelectDateHelper } from "../../components/SelectDateHelper";
import { SelectPriority } from "../../components/Priority";
import { formatDate } from "../../utils";
import { toast } from "sonner";
import { updateProjectRequest } from "../../requests/project-request";
import { useEffect } from "react";
import { useProjectStore } from "../../stores/Project";

export const UpdateForm: React.FC = () => {
  const {
    id,
    title,
    description,
    started_at,
    priority,
    created_at,
    due_date,
    patchProject,
  } = useProjectStore((state) => state);

  const setStartedAt = () => {
    const input = document.querySelector(
      '#project-form [name="started_at"]'
    ) as HTMLInputElement;
    const date = input?.value;

    if (!Boolean(date)) {
      toast.warning("No has establecido una Fecha de Inicio.");
      input?.focus();
      return;
    }

    patchProject("started_at", date);
    updateProjectRequest({ id, body: { started_at: date } });
  };

  useEffect(() => {
    updateProjectRequest({ id, body: { priority, due_date } });
    const selectDueDate = document.querySelector(
      '#project-form [name="due_date"]'
    );

    if (due_date && selectDueDate) {
      (selectDueDate as HTMLInputElement).value = due_date;
    }
  }, [priority, due_date]);

  return (
    <form onSubmit={(e) => e.preventDefault()} id="project-form">
      <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">
        Fecha de Creación:
      </span>
      <span className="block p-1 capitalize">{formatDate(created_at)}</span>

      <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">
        Título:
      </span>
      <XInput
        type="text"
        name="title"
        onChange={(e) => patchProject("title", e.target.value)}
        onBlur={() => updateProjectRequest({ id, body: { title } })}
        defaultValue={title}
      >
        {title}
      </XInput>

      <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">
        Descripción:
      </span>
      <XTextarea
        name="desciption"
        defaultValue={description}
        rows={10}
        onChange={(e) => patchProject("description", e.target.value)}
        onBlur={() => updateProjectRequest({ id, body: { description } })}
      >
        <p className="text-neutral-700 whitespace-break-spaces">
          {description}
        </p>
      </XTextarea>

      <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">
        Prioridad
      </span>
      <SelectPriority
        priority={priority}
        setPriority={(p) => patchProject("priority", p)}
        className="mb-3"
      />

      <div className="grid sm:grid-cols-2 gap-2 items-end">
        <div>
          <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">
            Fecha de Inicio
            {!started_at && (
              <span className="text-neutral-400 text-[10px] font-normal pl-1">
                (Una vez establecida no se podrá cambiar)
              </span>
            )}
          </span>
          {started_at ? (
            <span className="block p-1 capitalize">
              {formatDate(started_at)}
            </span>
          ) : (
            <div className="flex gap-1 items-center">
              <AppInput
                type="date"
                name="started_at"
                className="ml-1 flex-1"
                max={new Date().toJSON().substring(0, 10)}
              />
              <button
                type="button"
                onClick={() => setStartedAt()}
                title="Establecer Fecha de Inicio"
                className="text-[.6rem] px-1.5 py-0.5 rounded-md transition-colors duration-150 hover:bg-neutral-200 hover:shadow-lg"
              >
                ✔
              </button>
            </div>
          )}
        </div>
        <div>
          <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">
            Fecha de finalización estimada:
          </span>
          <div className="flex gap-1 items-center">
            <AppInput
              type="date"
              className="ml-1"
              defaultValue={due_date}
              name="due_date"
            />
            <SelectDateHelper
              date={due_date || null}
              setDate={(d) => patchProject("due_date", d)}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
