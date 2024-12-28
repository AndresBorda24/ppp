import { SubTask, Task } from "../../types";

interface Props {
  item: Task|SubTask
}
export const TaskModalFooter: React.FC<Props> = ({item}) => {
  return (
    <footer>
      { Boolean(item.id) ? (
        <div className={`p-2 grid text-xs grid-cols-2 border-t border-neutral-300 border-dashed ${(item.detail_type === 'task') ? 'bg-amber-50 text-amber-950' : 'bg-sky-50 text-sky-950'}`}>
          <div className="grid">
            <span className="font-bold">Fecha Creación:</span>
            <span>{item.created_at}</span>
          </div>
          <div className="grid">
            <span className="font-bold">Ultima Actualización:</span>
            <span>{item.updated_at}</span>
          </div>
        </div>
      ) : null }
    </footer>
  );
}
