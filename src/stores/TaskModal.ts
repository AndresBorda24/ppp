import { create, StateCreator } from "zustand";
import { SubTask, Task } from "../types";

interface ModalSlice {
    open: boolean
    task: Task|SubTask
    subtasks: SubTask[],
    prevTask?: Task
    openModal(task?: Task|SubTask): void
    setPrevTask(task?: Task): void
    pushSubtasks(subtasks: SubTask[]): void
    closeModal(): void
    patchTask(key: keyof Task, value: unknown): void
}

const baseTask: Task = {
    id: 0,
    detail_id: 0,
    detail_type: 'task',
    created_at: '0000-00-00',
    created_by_id: 0,
    priority: 'normal',
    status: 'new',
    title: '',
    description: ''
}

const createTaskModalSlice: StateCreator<
    ModalSlice, [], [], ModalSlice
> = (set) => ({
    open: false,
    task: {...baseTask},
    subtasks: [],
    openModal: (task?: Task|SubTask) => set(() => ({
        open: true,
        task: {... task || baseTask }
    })),
    setPrevTask: (task) => set(() => ({
        prevTask: task
    })),
    pushSubtasks: (subtasks: SubTask[]) => set(() => ({ subtasks })),
    closeModal: () => set(() => ({
        open: false,
        prevTask: undefined
    })),
    patchTask: (key, value) => set(({ task }) => {
        const newTask = {
            ...task,
            [key]: value
        }
        return { task: newTask };
    }),
})

export const useTaskModalStore = create<ModalSlice>()(((...a) => ({
    ...createTaskModalSlice(...a)
})))
