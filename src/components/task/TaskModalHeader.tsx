import { SubTask, Task } from "../../types";

import { Icon } from "@iconify-icon/react";
import { UpdateTaskStateButton } from "./UpdateTaskStateButton";
import { useProjectStore } from "../../stores/Project";
import { useTaskModalStore } from "../../stores/TaskModal";

export const TaskModalHeader: React.FC = () => {
  const {
    task,
    closeModal,
    prevTask,
    openModal,
    setPrevTask,
    patchTask,
    subtasks,
    pushSubtasks,
  } = useTaskModalStore();
  const { patchTask: patchTaskFromList } = useProjectStore();

  function openPrev() {
    openModal(prevTask);
    setPrevTask(undefined);
  }

  function handleCompleted(item: Task | SubTask) {
    patchTask("status", item.status);
    if (item.detail_type === "sub_task") return;

    patchTaskFromList(task as Task);
    if (item.status === "finished") {
      const newSubTasks = subtasks.map((s) => {
        s.status = "finished";
        return s;
      });
      pushSubtasks(newSubTasks);
    }
  }

  return (
    <header
      className={`p-1 border-neutral-200 border-b flex gap-2 justify-end items-center ${
        task.detail_type === "task" ? "bg-amber-50" : "bg-sky-50"
      }`}
    >
      {Boolean(prevTask) ? (
        <button
          onClick={openPrev}
          className="p-2 hover:bg-neutral-200 text-neutral-700 grid place-content-center rounded mr-auto"
        >
          <Icon icon="mingcute:left-fill" />
        </button>
      ) : null}
      {Boolean(task.id) ? (
        <div className="flex items-center gap-2 flex-grow">
          <UpdateTaskStateButton item={task} onUpdated={handleCompleted} />
          <div className="flex flex-col">
            <span className="text-neutral-400 text-xs">
              {task.detail_type === "task" ? "Tarea" : "Sub Tarea"}
            </span>
            <span className="text-neutral-500 text-xs">{task.title}</span>
          </div>
        </div>
      ) : null}
      <button
        onClick={closeModal}
        className="p-2 hover:bg-neutral-200 text-neutral-700 grid place-content-center rounded"
      >
        {" "}
        <Icon icon="material-symbols:close" />{" "}
      </button>
    </header>
  );
};
