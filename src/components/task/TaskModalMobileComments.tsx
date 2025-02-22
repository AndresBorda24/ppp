import { TaskModalSection } from "./TaskModalSection";
import { useModalComments } from "../../hooks/useModalComments";
import { useBreakpoint } from "../../hooks/breakpoints";
import { CommentItem } from "../comments/CommentItem";
import { NewComment } from "../comments/NewComment";
import { useTaskModalStore } from "../../stores/TaskModal";

export const TaskModalMobileComments: React.FC = () => {
  const { modalComments } = useModalComments();
  const { task } = useTaskModalStore()
  const isLg = useBreakpoint("lg");
  if (isLg) return null;
  if (! task.id) return null;

  return (
    <TaskModalSection
      title="Comentarios"
      topChildren={
        <span className="text-gray-500 px-2 text-xs">
          {modalComments.length}
        </span>
      }
    >
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
    </TaskModalSection>
  );
};
