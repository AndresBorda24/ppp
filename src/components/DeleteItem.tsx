import { BaseButton } from "./button";
import { BasicInput } from "./forms";
import { DetailType } from "../types";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { deleteItem } from "../requests/project-request";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  type: DetailType;
  itemId: number;
  className?: string;
  onDeleted?: () => unknown
}
export const DeleteItem: React.FC<Props> = ({ type, itemId, className = '', onDeleted }) => {
  const [confirm, setConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const confirmed = confirm.toLowerCase() === "eliminar";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDeleting(true);
    const deleted = await deleteItem(type, itemId);
    setDeleting(false);

    if (deleted) {
      onDeleted && onDeleted();
      setConfirm('');
      (e.target as HTMLFormElement).reset();
      toast.success('Item eliminado correctamente!')
    }
    else toast.error(
      'Ha ocurrido un error al intentar eliminar el item'
    );
  }

  return (
    <div className={`${className}`}>
      <div className="flex gap-3 text-red-900 relative">
        {deleting ? (
          <div className="absolute inset-0 w-full h-full bg-red-50/85 flex items-center justify-center gap-1 rounded">
            <Icon icon='svg-spinners:pulse' className="text-xl"/>
            <span className="italic font-semibold">Eliminando</span>
          </div>
        ) : null}
        <Icon
          icon="material-symbols-light:warning-rounded"
          className="text-3xl self-center"
        />
        <div className="flex-1">
          <span className="font-bold text-base block">Eliminar</span>
          <form className="flex gap-1" onSubmit={onSubmit}>
            <label className="text-xs italic text-neutral-400 flex-1">
              Escribre "ELIMINAR" para continuar:
              <BasicInput
                required
                type="text"
                maxLength={8}
                autoComplete='ON'
                name="confirmation-delete-input"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="rounded-lg bg-gray-100 px-3 py-1 text-sm w-full uppercase text-gray-600"
                placeholder="ELIMINAR"
              />
            </label>
            <BaseButton
              color="free"
              type="submit"
              disabled={! confirmed}
              className={`aspect-square self-end !rounded-full grid place-content-center transition-colors duration-200 !p-2.5 ${
                confirmed
                  ? "bg-red-200 text-red-900"
                  : "bg-gray-200 text-gray-400 pointer-events-none"
              }`}
            >
              <Icon icon="mdi:trash" />
            </BaseButton>
          </form>
        </div>
      </div>
    </div>
  );
};
