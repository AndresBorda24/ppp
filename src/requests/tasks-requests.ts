import { appFetch } from "../AppFetch";
import { SubTask, Task } from "../types";

export function patchTask({ id, body }: {id: number, body: any}) {
  return appFetch<Task>('PATCH', { url: `/tasks/${id}/patch`, body })
}

export function updateTask(task: Task) {
  return appFetch<Task>('PUT', {
    url: `/tasks/${task.detail_id}/update`,
    body: task
  })
}

export function getSubTasks(task: Task) {
  return appFetch<SubTask[]>('GET', { url: `/tasks/${task.detail_id}/subtasks` })
}
