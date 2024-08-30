import { create, StateCreator } from "zustand";
import { Details, Project } from "../types";

interface ProjectState extends Project {
    tasks: Details[]
}

interface ProjectSlice extends ProjectState {
    patchProject: (key:  keyof Exclude<ProjectState, 'tasks'>, val: unknown) => void
    rewriteProject: (val: Project) => void
}

const initialState: ProjectState = {
    id: 0,
    slug: '',
    detail_id: 0,
    detail_type: 'project',
    created_at: '0000-00-00',
    created_by_id: 0,
    priority: 'high',
    status: 'new',
    title: '',
    tasks: []
}

const createProjectSlice: StateCreator<
    ProjectSlice, [], [], ProjectSlice
> = (set) => ({
    ...initialState,
    patchProject: (key, value) => set(() => ({ [key]: value })),
    rewriteProject: (newProject) => set(() => newProject)
})

export const useProjectStore = create<ProjectSlice>()(((...a) => ({
    ...createProjectSlice(...a)
})))
