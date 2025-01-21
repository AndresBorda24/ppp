import { SubTask, Task } from "../../types";

import { Icon } from "@iconify-icon/react"
import { markAsCompleted } from "../../requests/tasks-requests";

interface Props {
  item: Task|SubTask,
  onUpdated: (item: Task|SubTask) => void,
}
export const UpdateTaskStateButton: React.FC<Props> = ({ item, onUpdated }) => {
  function switchStatus() {
    item.status = (item.status === 'finished')
      ? 'process'
      : 'finished';

    markAsCompleted(item, (item.status === 'finished')).then(success => {
      if (!success) {
        item.status = (item.status === 'finished')
          ? 'process'
          : 'finished';
        onUpdated(item);
      }
    });

    onUpdated(item);
  }

  return (
    <button onClick={switchStatus} type="button" className={`group flex h-4 w-4 flex-shrink-0 rounded-full border cursor-pointer transition-colors duration-150 ${(item.status === 'finished')
      ? 'bg-neutral-500/20 border-neutral-500'
      : 'bg-aso-primary/10 border-aso-primary'
      }`}>
      <Icon
        icon="material-symbols:check"
        className="m-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150"
      />
    </button>
  )
}
