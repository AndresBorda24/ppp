export type PaginatedProject = {
    id: number;
    slug: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    created_at: string;
}
export type PaginationProjects = {
  data: PaginatedProject[],
  pagination: Object
}
