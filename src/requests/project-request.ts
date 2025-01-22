import { BareBasicProject, CommentWithTitle, PaginatedProject, Project, Task } from "../types";

import { appFetch } from "../AppFetch";

export async function updateProjectRequest({
  id,
  body,
}: {
  id: number;
  body: any;
}) {
  await appFetch<Project>("PATCH", { url: `/projects/${id}/patch`, body });
}

export async function findProjectBySlug(slug: string) {
  return await appFetch<Project>("GET", { url: `/projects/${slug}/find` });
}

export async function findTasksByProjectId(id: number) {
  return appFetch<Task[]>("GET", { url: `/projects/${id}/tasks` });
}

export async function findCommentsByProjectId(id: number) {
  return appFetch<CommentWithTitle[]>("GET", {
    url: `/projects/${id}/observations`,
  });
}

export async function createProject(project: BareBasicProject) {
  return appFetch<PaginatedProject>("POST", {
    url: "/projects/store",
    body: project
  });
}
