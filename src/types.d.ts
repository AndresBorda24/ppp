export type PaginatedProject = {
    id: number;
    slug: string;
    title: string;
    description: string;
    status: string;
    priority: Priority;
    created_at: string;
}

export type Pagination = {
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
  last_page: number
}

export type DetailType = 'task'|'project'|'sub_task'

export type PaginationProjects = {
  data: PaginatedProject[],
  pagination: Pagination
}

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
  started_at?: string
  updated_at?: string;
}

export interface Project extends Details {
  id: number;
  slug: string;
}

export type Priority = 'high'|'normal'|'low'
export type Status = 'new'|'finished'|'process'|'paused'

export interface Task extends Details {
  id: number;
  project_id: number;
}

export interface SubTask extends Details {
  id: number;
  task_id: number;
}
