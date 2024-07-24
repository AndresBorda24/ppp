import { toastError, url, _fetch, loader } from "../../extra/utilities.js";

export default () => ({
    children: [],
    showList: true,
    sortControl: 0,
    init() {
        this.$nextTick( () => this.handlerLoader() );
    },
    /**
     * Determina si realizar o no la peticion dependiendo del tipo.
     */
    async handlerLoader(e) {
        await this.loadChildren( Alpine.store("__control").id );
        this.sortByPriority();

        if (e && e.detail) {
            this.handleItemUpdate(e);
        }
    },
    /**
     * Realiza la petición.
     *
     * @param {Number} id Representa el id del registro
     * @param {String} type Representa el tipo (Proyecto | tarea ...)
     */
    async loadChildren(id) {
        try {
            loader.classList.remove("d-none");
            const data = await ( await fetch(`${url}project/${id}/tasks`) ).json();

            Alpine.store("currentTasksList", data.tasks);
            Alpine.store("progress").formated = this.progress(data.parent.progress);
            Alpine.store("progress").raw = data.parent.progress;
            this.$dispatch("task-list-loaded");
        } catch (error) {
            toastError(error.message);
        }

        loader.classList.add("d-none");
    },
    /**
     * Da formato al progreso de la tarea.
     *
     * @param {Nuber} progress represent el progreso de la tarea
     * @returns {String}
     */
    progress(progress) {
        return progress == 101 ? "No Aplica" : `${progress}%`;
    },
    /**
     * Ordena las tareas en base a su prioridad
     * @returns {void}
     */
    sortByPriority() {
        let rules = {};
        switch (this.sortControl % 3) {
            case 1:
                rules = { low: 1, normal: 2,  high: 3};
                break;
            case 2:
                rules = { low: 3, normal: 2,  high: 1};        
                break;
            default:
                this.children = [... Alpine.store("currentTasksList")];
                return;
        }

        this.children = [... Alpine.store("currentTasksList")] .sort( (a, b) =>  rules[a.priority] - rules[b.priority]);
    },
    handleItemUpdate( e ) {
        const _ = e.detail;

        if (_.taskId) {
            const task = Alpine.store("currentTasksList").find(task => task.id == _.taskId);
            const subTask = task._subTasks.find(sub=> sub.id == _.id);

            this.$dispatch(`refresh-${task.type}-${task.id}`, task);
            this.$dispatch(`refresh-sub-task-${subTask.id}`, subTask);
            return;
        }

        const task = Alpine.store("currentTasksList").find(task => task.id == _.id);
        this.$dispatch(`refresh-${task.type}-${task.id}`, task);
        return;
    }
});
