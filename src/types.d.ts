export type PaginatedProject = {
    id: number;
    slug: string;
    title: string;
    description: string;
    status: string;
    priority: string;
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

export type PaginationProjects = {
  data: PaginatedProject[],
  pagination: Pagination
}
