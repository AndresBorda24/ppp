import { SubTask, Task } from "../types";

import { appFetch } from "../AppFetch";
import { toast } from "sonner";

export function patchTask({ id, body }: { id: number; body: any }) {
  return appFetch<Task>("PATCH", { url: `/tasks/${id}/patch`, body });
}

export function patchSubTask({ id, body }: { id: number; body: any }) {
  return appFetch<SubTask>("PATCH", { url: `/subtasks/${id}/patch`, body });
}

export function updateTask(task: Task) {
  return appFetch<Task>("PUT", {
    url: `/tasks/${task.detail_id}/update`,
    body: task,
  });
}

export function updateSubTask(subtask: SubTask) {
  return appFetch<SubTask>("PUT", {
    url: `/subtasks/${subtask.detail_id}/update`,
    body: subtask,
  });
}

export function getSubTasks(task: Task) {
  return appFetch<SubTask[]>("GET", {
    url: `/tasks/${task.detail_id}/subtasks`,
  });
}

export function createTask(task: Task) {
  return appFetch<Task>("POST", {
    url: `/tasks/${task.project_id}/create`,
    body: task,
  });
}

export function createSubTask(subtask: SubTask) {
  return appFetch<SubTask>("POST", {
    url: `/subtasks/${subtask.task_id}/create`,
    body: subtask,
  });
}

export async function deleteTaskOrSubTask(item: Task | SubTask) {
  const { data, error } = await appFetch<{ status: boolean }>("DELETE", {
    url: `/${item.detail_type === "task" ? "tasks" : "subtasks"}/${
      item.detail_id
    }/delete`,
  });

  if (error) {
    toast.error("Error al eliminar: " + error.error);
    return false;
  }

  return data?.status;
}

export async function markAsCompleted(
  item: Task | SubTask,
  completed: boolean
) {
  const { error, data } = await appFetch<{ status: boolean }>("PATCH", {
    url: `/${item.detail_type === "task" ? "tasks" : "subtasks"}/${
      item.id
    }/completed/${completed ? "1" : "0"}`,
  });

  return error ? false : data?.status;
}
