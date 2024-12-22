import { useProjectStore } from "../../stores/Project";
import { CommentItem } from "../comments/CommentItem";

export const Comments: React.FC = () => {
  const { comments } = useProjectStore();

  return (
    <div className="w-full relative">
      <header className="mb-2">
        <h5 className="text-aso-secondary font-bold text-base mb-1">Comentarios</h5>
      </header>
      {
        (comments.length === 0)
          ? <span>Aún no hay comentarios para este Proyecto.</span>
          : (
            <div role="list" className="flex flex-col space-y-6 overflow-auto">
              {
                comments.map(comment => (<CommentItem key={comment.id} comment={comment} />))
              }
            </div>
          )
      }
    </div>
  );
}
