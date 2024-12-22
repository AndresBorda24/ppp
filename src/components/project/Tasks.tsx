import { useEffect, useState } from "react";
import { Task as TaskType } from "../../types";
import { useProjectStore } from "../../stores/Project";
import { Icon } from "@iconify-icon/react";
import { AppInput } from "../forms";
import { useDebounce } from "use-debounce";
import { useTaskModalStore } from "../../stores/TaskModal";
import { TaskItem } from "../task/TaskList";

interface TaskListProps {
  className?: string;
}
export const TaskList: React.FC<TaskListProps> = ({ className = "" }) => {
  const { tasks, patchTask } = useProjectStore();
  const [showCompleted, setShowCompleted] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
  const { openModal } = useTaskModalStore();

  useEffect(() => {
    const x = debouncedSearch.toLowerCase();
    const newTasks = tasks
      .filter((t) => showCompleted || t.status !== "finished")
      .filter((t) =>
        t.title
          .toLowerCase()
          .concat(t.description?.toLowerCase() ?? "")
          .includes(x)
      )
      .sort((a, b) => {
        if (a.status === "finished" && b.status !== "finished") return 1;
        if (a.status !== "finished" && b.status === "finished") return -1;
        return 0;
      });
    setFilteredTasks(newTasks);
  }, [debouncedSearch, tasks, showCompleted]);

  return (
    <div className="w-full relative">
      <header className="mb-2">
        <h5 className="text-aso-secondary font-bold text-base mb-1">Tareas</h5>
        <div className="absolute top-0 right-0 text-xs flex itemx-center gap-2">
          <button
            className="px-2 py-0.5 rounded bg-blue-50 text-blue-500 focus-within:outline-1 focus:outline-dotted outline-gray-400 outline-offset-2 hover:shadow-inner flex items-center"
            onClick={() => openModal()}
          >
            <Icon
              icon="material-symbols-light:add"
              className="text-base"
            />Nueva Tarea
          </button>
          <button
            className="px-2 py-0.5 rounded bg-green-50 text-green-500 focus-within:outline-1 focus:outline-dotted outline-gray-400 outline-offset-2 hover:shadow-inner flex items-center"
            onClick={() => setShowCompleted(!showCompleted)}
          >
            {" "}
            {showCompleted ? "Ocultar" : "Mostrar"} Completadas{" "}
          </button>
        </div>
        <AppInput
          type="search"
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Terminar el filtrado de tareas"
        />
      </header>
      {filteredTasks.length === 0 ? (
        <span>Aún no hay tareas para este Proyecto.</span>
      ) : (
        <div
          role="list"
          className={`flex flex-col space-y-2 overflow-auto ${className} lg:max-h-[calc(100vh-250px)] tiny-scrollbar pr-4`}
        >
          {filteredTasks.map((task) => (
            <TaskItem
              item={task}
              key={task.detail_id}
              onUpdated={(item) => patchTask(item as TaskType)}
              onClick={() => openModal(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
