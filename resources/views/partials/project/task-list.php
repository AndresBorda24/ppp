<!---------------------------------- Tareas | Sub tareas ---------------------------------->
<div 
class="overflow-auto position-relative" 
x-data="tasksList" style="margin-top: -2.5rem;"
@load-tasks.document.stop="handlerLoader">
  <div class="obs-filters me-3 top-0 end-0" x-show="showList">
    <button class="btn btn-sm btn-outline-success m-1" @click="sortControl++; sortByPriority()">Ordenar</button>
  </div>

  <!-- Se realiza el listado de tareas -->
  <div class="list-group mt-5 px-1 px-md-3 px-lg-4 position-relative" id="child-list" x-show="showList" x-collapse>

    <template x-for="task in children" :key="task.id">
      <div :class="isFinished" class="align-items-center list-group-item p-1 list-group-item-action" x-data="taskListItem( task )" x-bind="refreshEvent">
        <!-- Tarea -->
        <div :id="'task-' + task.id" class="ps-3 user-select-none p-1 d-flex align-items-center">
          <!-- Titulo de la Tarea  -->
          <span
            x-text="data.title"
            role="button" @dblclick="$dispatch('load-child', { ... data })"
            class="a-little-small flex-grow-1 m-0 line-height-26 lh-sm"></span>

          <!-- Iconos y Estatus -->
          <div class="d-flex flex-shrink-0" style="padding-left: 10px;">
            <!-- prioridad de la tarea -->
            <span 
            x-text="prioritySpanish" style="background-color: var(--bs-gray-100)"
            class="rounded _border really-small p-1 m-0 me-1 d-inline-block"></span>
            <!-- Estado -->
            <span 
            x-text="statusSpanish" style="background-color: var(--bs-gray-200)"
            class="rounded  _border really-small p-1 m-0 me-1 d-inline-block"></span>
            <!-- Progreso de la tarea -->
            <span 
            x-text="progress" style="background-color: var(--bs-gray-300)"
            class="rounded _border really-small p-1 m-0" :class="data.progress == 101 ? 'd-none' : 'd-inline-block'"></span>
            <!-- Botón de añadir sub-tarea -->
            <template x-if="showAddSubTask">
              <i
              @click="$dispatch('load-child', { father: data.id, type: 'sub_task', pTitle: data.title })"
              role="button"
              title="Agregar sub-tarea"
              class="bi bi-plus-lg d-inline-block px-1"></i>
            </template>

            <!-- Botón de expandir sub-tareas -->
            <template x-if="data._subTasks">
              <i 
                @click="showSubtasks = !showSubtasks"
                role="button" 
                :id="'expand-'+task.id"
                title="Ocultar/Expandir sub-tareas"
                :class="showSubtasks ? 'bi-chevron-up' : 'bi-chevron-down'"
                class="bi d-inline-block"></i>
            </template>
          </div>
        </div>

        <!-- Listado de Sub-Tareas -->
        <template x-if="data._subTasks">
          <div x-cloak
          class="list-group ps-2 ps-md-3 ps-lg-4 overflow-hidden"
          :id="'stlist-'+task.id" x-collapse.duration.100ms x-show="showSubtasks">

            <template x-for="subt in data._subTasks" :key="subt.id">
              <div x-data="taskListItem( subt )"
                x-bind="refreshEvent"
                style="width: 90%;"
                :id="'sub-task-' + subt.id"
                :class="isFinished"
                class="sub-task-item ms-auto user-select-none p-1 list-group-item list-group-item-action d-flex align-items-center">
                <!-- Titulo de la Sub-Tarea -->                              
                <span x-text="data.title" class="flex-grow-1 small m-0 line-height-26 a-little-small underline-hover lh-sm" role="button" @dblclick="$dispatch('load-child', {
                  ...data,
                  pStatus: task.status,
                  pTitle: task.title
                })"></span>
                <!-- Estatus de la tarea -->
                <span class="text-muted fst-italic float-end really-small p-1 m-0 me-2" x-text="statusSpanish"></span>
              </div>
            </template>
          </div>
        </template>
      </div>
    </template>
  </div>
</div>
