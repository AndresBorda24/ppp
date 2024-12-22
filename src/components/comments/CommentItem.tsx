import { CommentWithTitle as CommentType, DetailType } from "../../types";

interface Props {
  comment: CommentType;
}
export const CommentItem: React.FC<Props> = ({ comment }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <img
          className="h-7 w-7 rounded-full"
          src={`https://ui-avatars.com/api/?name=${comment.author_id}`}
          alt={`Comentario por: ${comment.author_id}`}
          title={`Comentario por: ${comment.author_id}`}
        />
      </div>
      <div className={`flex-1 flex flex-col text-sm text-neutral-600`} role="listitem">
        <div className="flex items-center gap-4">
          <span className="font-bold">{comment.author_id}</span>
          <span className="font-light text-xs block pr-2 text-neutral-400">
            {comment.created_at}
          </span>
        </div>
        <p className=" whitespace-pre-wrap text-pretty">{comment.body}</p>
        <span
          title={comment.title}
          className="block w-1/2 text-xs text-nowrap text-ellipsis text-neutral-400 italic overflow-hidden"
        > {comment.title} </span>
      </div>
    </div>
  );
};
