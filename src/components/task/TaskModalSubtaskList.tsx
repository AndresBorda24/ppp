import { useTaskModalStore } from "../../stores/TaskModal"
import { useEffect, useState } from "react";
import { getSubTasks } from "../../requests/tasks-requests";
import { SubTask, Task } from "../../types";
import { TaskModalSection } from "./TaskModalSection";
import { TaskItem } from "./TaskList";

export const TaskModalSubtaskList: React.FC = () => {
  const { task } = useTaskModalStore();
  const [list, setList] = useState<SubTask[]>([])
  const [finished, setFinished] = useState(0)

  if (task.detail_type !== 'task' || !Boolean(task.id)) {
    return null;
  }

  function handleOnItemUpdated(item: SubTask|Task) {
    if (item.detail_type === 'sub_task') {
      const newList = sortList(list.map(i => (i.id === item.id) ? item : i));
      setList(newList);
    }
  }

  function sortList(l: SubTask[]) {
    return l.sort((a, b) => {
      if (a.status === 'finished' && b.status !== 'finished') return 1;
      if (a.status !== 'finished' && b.status === 'finished') return -1;
      return 0;
    });
  }

  useEffect(() => {
    getSubTasks(task).then((value) => {
      if (!value.error) {
        const orderedList = sortList(value.data ?? []);
        setList(orderedList ?? []);
      }
    });
  }, [])

  useEffect(() => {
    const subTasksFinished = list.reduce((acc, i) => {
      acc += (i.status === 'finished') ? 1 : 0
      return acc;
    }, 0);
    setFinished(subTasksFinished);
  },[list]);

  return (
    <TaskModalSection
      title="SubTareas"
      topChildren={(
        <div className="text-xs px-2 text-neutral-500">
          <span>{finished}</span> / <span>{list.length}</span>
        </div>
      )}
    >
      <div className="flex flex-col space-y-2" role="list">
        {
          list.map(item => (
            <TaskItem
              key={item.id}
              item={item}
              onUpdated={handleOnItemUpdated}
            />
          ))
        }
      </div>
    </TaskModalSection>
  );
}
