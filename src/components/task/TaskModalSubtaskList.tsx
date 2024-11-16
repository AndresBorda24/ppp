import { useTaskModalStore } from "../../stores/TaskModal"
import { useEffect, useState } from "react";
import { getSubTasks } from "../../requests/tasks-requests";
import { SubTask } from "../../types";
import { TaskModalSection } from "./TaskModalSection";
import { TaskItem } from "./TaskList";

export const TaskModalSubtaskList: React.FC = () => {
  const { task } = useTaskModalStore();
  const [list, setList] = useState<SubTask[]>([])

  if (task.detail_type !== 'task') {
    return null;
  }

  useEffect(() => {
    getSubTasks(task).then((value) => {
      if (!value.error) {
        setList(value.data ?? []);
      }
    });
  }, [])

  return (
    <TaskModalSection title="SubTareas">
      <div className="flex flex-col space-y-2" role="list">
        {
          list.map(item => (
            <TaskItem
              key={item.id}
              item={item}
            />
          ))
        }
      </div>
    </TaskModalSection>
  );
}
