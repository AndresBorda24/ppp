import { useBreakpoint } from "../../hooks/breakpoints";
import { useModalComments } from "../../hooks/useModalComments";
import { useTaskModalStore } from "../../stores/TaskModal";
import { CommentItem } from "../comments/CommentItem";
import { NewComment } from "../comments/NewComment";

export const TaskModalComments: React.FC = () => {
  const { modalComments } = useModalComments();
  const { task } = useTaskModalStore();
  const isLg = useBreakpoint("lg");
  if (!isLg || !task.id) return null;

  return (
    <div className="bg-neutral-50 p-4 rounded-l max-h-[85vh] h-full shadow-inner max-w-sm w-full overflow-auto">
      <span className="select-none text-sm font-semibold text-neutral-600 cursor-pointer block mb-4">
        Comentarios
      </span>

      <div className="mb-4">
        <NewComment type={task.detail_type} id={task.id} />
      </div>

      {modalComments.length === 0 ? (
        <span className="text-sm italic text-neutral-500">Aún no hay comentarios.</span>
      ) : (
        <div role="list" className="flex flex-col space-y-6 overflow-auto">
          {modalComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};
