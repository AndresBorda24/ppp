import { useState } from "react";
import { DetailType, Comment, CommentWithTitle } from "../../types";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { BasicTextarea } from "../forms";
import { BaseButton } from "../button";
import { useProjectStore } from "../../stores/Project";
import { appFetch } from "../../AppFetch";

interface Props {
  className?: string;
  type: DetailType;
  id: number;
}
export const NewComment: React.FC<Props> = ({ type, id, className = "" }) => {
  const [showForm, setShowForm] = useState(false);
  const { id: projectId, addNewComment } = useProjectStore();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const textarea = form.querySelector("textarea") as HTMLTextAreaElement;
    const comment = textarea.value.trim();

    if (comment.length < 1) {
      textarea.value = comment;
      form.reportValidity();
      return;
    }

    const data: Comment = {
      id: 0,
      obs_id: id,
      obs_type: type,
      project_id: projectId,
      body: comment,
      author_id: 49,
      created_at: "",
    };

    try {
      const { data: newComment, error } = await appFetch<CommentWithTitle>("POST", {
        url: "/comments/create",
        body: data,
      });

      if (error) throw error;
      if (newComment) {
        addNewComment(newComment);
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
      /* Do something */
    }
  }

  return (
    <>
      {!showForm && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className={`flex justify-start gap-3 items-center text-neutral-500 text-left rounded-full w-full bg-white border border-neutral-200 transition-colors duration-200 hover:bg-neutral-50 px-4 py-1 ${className}`}
        >
          <Icon icon={`mdi:comment-multiple`} />{" "}
          <span className="text-sm">Nuevo Comentario</span>
        </button>
      )}

      {showForm && (
        <div className="border border-dashed border-neutral-300 rounded p-3">
          <form onSubmit={onSubmit}>
            <BasicTextarea
              autoFocus
              required
              minLength={1}
              name="new-comment-textarea"
              placeholder="Comentar"
              className="text-sm text-neutral-800 w-full mb-1 resize-none !bg-transparent"
            />
            <div className="flex justify-end items-center gap-4">
              <BaseButton
                size="small"
                color="red"
                type="button"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </BaseButton>
              <BaseButton size="small" type="submit">
                Comentar
              </BaseButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
