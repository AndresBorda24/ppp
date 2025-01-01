export type PaginatedProject = {
  id: number;
  slug: string;
  title: string;
  description: string;
  status: string;
  priority: Priority;
  created_at: string;
};

export type Pagination = {
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
  last_page: number;
};

export type IndexloaderDataType = {
  data: PaginationProjects;
  error: any;
  title: string;
  page: string;
  order: string;
  status: string;
  amount: string;
};

export type DetailType = "task" | "project" | "sub_task";

export type PaginationProjects = {
  data: PaginatedProject[];
  pagination: Pagination;
};

export interface Details {
  detail_id: number;
  detail_type: DetailType;
  created_at: string;
  created_by_id: number;
  priority: Priority;
  status: Status;
  title: string;
  delegate_id?: number;
  description?: string;
  due_date?: string;
  estimated_time?: string;
  finished_at?: string;
  started_at?: string;
  updated_at?: string;
}

export interface Project extends Details {
  id: number;
  slug: string;
}

export type Priority = "high" | "normal" | "low";
export type Status = "new" | "finished" | "process" | "paused";

export interface Task extends Details {
  id: number;
  project_id: number;
}

export interface SubTask extends Details {
  id: number;
  task_id: number;
}

export interface Comment {
  id: number;
  body: string;
  author_id: number;
  created_at: string;
  obs_type: DetailType;
  obs_id: number;
  project_id: number;
}

export interface CommentWithTitle extends Comment {
  title: string;
  author_name: string;
}

export interface User {
  id: number;
  nombre: string;
  documento: string;
  area_id: number;
  area_nombre: string;
}

export interface RequestError {
  status?: boolean;
  error: string
}

export interface RequestFormError extends RequestError {
  fields?: { [k: string]: string[] };
}
