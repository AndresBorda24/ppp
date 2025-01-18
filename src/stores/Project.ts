import { CommentWithTitle, Project, Task } from "../types";
import { StateCreator, create } from "zustand";

interface ProjectState extends Project {
    tasks: Task[];
    comments: CommentWithTitle[]
}

interface ProjectSlice extends ProjectState {
    patchProject: (key:  keyof Exclude<ProjectState, 'tasks'>, val: unknown) => void
    rewriteProject: (val: Project) => void
    pushComments: (val: CommentWithTitle[]) => void
    addNewComment: (val: CommentWithTitle) => void
    pushTaks: (val: Task[]) => void
    patchTask: (val: Task) => void,
    addNewTask: (val: Task) => void
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
    tasks: [],
    comments: []
}

const createProjectSlice: StateCreator<
    ProjectSlice, [], [], ProjectSlice
> = (set) => ({
    ...initialState,
    patchProject: (key, value) => set(() => ({ [key]: value })),
    rewriteProject: (newProject) => set(() => newProject),
    pushTaks: (tasks) => set(() => ({ tasks })),
    patchTask: (task) => set((state) => {
        const newTasks = state.tasks.map((t) => {
            return (t.detail_id === task.detail_id)
                ? task
                : t
        });
        return { tasks: newTasks };
    }),
    addNewTask: (task) => set((state) => {
        const tasks = [...state.tasks, task];
        return { tasks };
    }),
    pushComments: (comments) => set(() => ({ comments })),
    addNewComment: (comment) => set((state) => {
        const comments = [comment, ...state.comments];
        return { comments };
    })
})

export const useProjectStore = create<ProjectSlice>()(((...a) => ({
    ...createProjectSlice(...a)
})))
