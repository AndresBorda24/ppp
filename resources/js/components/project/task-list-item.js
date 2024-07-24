export default ( data ) => ({
    data: data,
    showSubtasks: false,
    refreshEvent: {
        [`@refresh-${data.type.replace('_', '-')}-${data.id}.document`]({ detail }) {
            this.data = detail;
        }
    },
    /**
     * Da formato al progreso de la tarea.
     *
     * @param {Nuber} progress represent el progreso de la tarea
     * @returns {String}
     */
    progress() {
        return this.data.progress == 101 ? "No Aplica" : `${this.data.progress}%`;
    },
    /**
     * Determina si se muestra el botón ( + ) de crear nueva sub-tarea.
     *
     * @returns {Boolean}
     */
    showAddSubTask() {
        return (
            this.data.status == "process" &&
            Alpine.store("__control").status == "process" &&
            this.data.type == "task"
        );
    },
    /**
     * Simplemente da una clase especial (fondo rojo) si la tarea
     * esta marcada como fincalizada.
     *
     * @param {String} status El estado de la tarea
     * @returns
     */
    isFinished() {
        return this.data.status == "finished" ? "list-group-item-danger" : "list-group-item-light";
    },
    /**
     * Imprime el estado en español
     */
    statusSpanish() {
        switch (this.data.status) {
            case "new":
                return 'Nueva';
            case "process":
                return 'En proceso';
            case "paused":
                return "Pausado";
            case "finished":
                return "Finalizado";
            default:
                return 'En proceso';
        }
    },
    /**
     * Imprime el estado en español
     */
    prioritySpanish() {
        switch (this.data.priority) {
            case "low":
                return 'Baja';
            case "normal":
                return 'Normal';
            default:
                return 'Alta';
        }
    }
});
