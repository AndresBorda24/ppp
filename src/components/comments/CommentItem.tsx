import { CommentWithTitle as CommentType } from "../../types";
import { SelfhideMenu } from "../SelfhideMenu";
import { SelfhideMenuItem } from "../SelfhideMenuItem";
import { deleteComment } from "../../requests/comment-request";
import { useProjectStore } from "../../stores/Project";
import { useUserInfo } from "../../hooks/useUserInfo";

interface Props {
  comment: CommentType;
}
export const CommentItem: React.FC<Props> = ({ comment }) => {
  const { user } = useUserInfo();
  const { removeComment, addNewComment } = useProjectStore();

  const hanldeDeleteComment = async () => {
    removeComment(comment);
    const deleted = await deleteComment(comment);
    if (! deleted) addNewComment(comment);
  }

  return (
    <div className="flex gap-4 relative" role="listitem">
      {(user.id === comment.author_id) ? (
        <div className="absolute top-0 right-0 mt-1 mr-1">
          <SelfhideMenu>
            <SelfhideMenuItem onClick={() => {hanldeDeleteComment()}} label="Eliminar" icon="ic:round-delete"/>
          </SelfhideMenu>
        </div>
      ) : null}

      <div className="flex-shrink-0">
        <img
          className="h-7 w-7 rounded-full"
          src={`https://ui-avatars.com/api/?name=${comment.author_name || comment.author_id}&size=32`}
          alt={`Comentario por: ${comment.author_id}`}
          title={`Comentario por: ${comment.author_id}`}
        />
      </div>
      <div className={`flex flex-col text-sm text-neutral-600 overflow-auto`}>
        <div className="leading-tight">
          <span className="font-bold text-xs">{comment.author_name}</span><br />
          <span className="font-light text-xs block pr-2 text-neutral-400">
            {comment.created_at}
          </span>
        </div>
        <p className="whitespace-pre-wrap text-pretty">{comment.body}</p>
        <span
          title={comment.title}
          className="block w-1/2 text-xs text-nowrap text-ellipsis text-neutral-400 italic overflow-hidden"
        > {comment.title} </span>
      </div>
    </div>
  );
};
