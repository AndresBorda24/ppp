import { appFetch } from "../AppFetch";
import { SubTask, Task } from "../types";

export function patchTask({ id, body }: {id: number, body: any}) {
  return appFetch<Task>('PATCH', { url: `/tasks/${id}/patch`, body })
}

export function patchSubTask({ id, body }: {id: number, body: any}) {
  return appFetch<SubTask>('PATCH', { url: `/subtasks/${id}/patch`, body })
}

export function updateTask(task: Task) {
  return appFetch<Task>('PUT', {
    url: `/tasks/${task.detail_id}/update`,
    body: task
  })
}

export function updateSubTask(subtask: SubTask) {
  return appFetch<SubTask>('PUT', {
    url: `/subtasks/${subtask.detail_id}/update`,
    body: subtask
  })
}

export function getSubTasks(task: Task) {
  return appFetch<SubTask[]>('GET', { url: `/tasks/${task.detail_id}/subtasks` })
}

export function createTask(task: Task) {
  return appFetch<Task>('POST', {
    url: `/tasks/${task.project_id}/create`,
    body: task
  })
}

export function createSubTask(subtask: SubTask) {
  return appFetch<SubTask>('POST', {
    url: `/subtasks/${subtask.task_id}/create`,
    body: subtask
  })
}
