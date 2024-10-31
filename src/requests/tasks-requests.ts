import { appFetch } from "../AppFetch";
import { Task } from "../types";

export function patchTask({ id, body }: {id: number, body: any}) {
  return appFetch<Task>('PATCH', { url: `/tasks/${id}/patch`, body })
}
