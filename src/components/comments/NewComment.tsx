import { useState } from "react";
import { DetailType } from "../../types";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { BasicTextarea } from "../forms";
import { BaseButton } from "../button";

interface Props {
  className?: string;
  type: DetailType;
  id: number;
}
export const NewComment: React.FC<Props> = ({ type, id, className = "" }) => {
  const [showForm, setShowForm] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

  }

  return (
    <>
      {!showForm && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className={`flex justify-start gap-3 items-center text-neutral-500 text-left rounded-full w-full bg-white border border-neutral-200 transition-colors duration-200 hover:bg-neutral-50 px-4 py-1 ${className}`}
        >
          <Icon icon={`mdi:comment-multiple`} /> <span className="text-sm">Nuevo Comentario</span>
        </button>
      )}

      {showForm && (
        <div className="border border-dashed border-neutral-300 rounded p-3">
          <form onSubmit={onSubmit}>
            <BasicTextarea
              name="new-comment-textarea"
              placeholder="Comentar"
              className="text-sm text-neutral-800 w-full mb-1 resize-none"
            />
            <div className="flex justify-end items-center gap-4">
              <BaseButton
                size="small"
                color="red"
                type="button"
                onClick={() => setShowForm(false)}
              >Cancelar</BaseButton>
              <BaseButton size="small" type="submit">Comentar</BaseButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
