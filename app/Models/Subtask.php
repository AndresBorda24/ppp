<?php
namespace App\Models;

use App\Dto\TaskDto;
use Medoo\Medoo;

class Subtask
{
    public const TYPE = "sub_task";
    public const TABLE = "pp_sub_tasks";

    public function __construct(
        public readonly Medoo $db
    ){}

    /**
     * Convierte la sub-tarea actual en una tarea
     * @param int|string $id Representa el id de la sub-tarea
     */
    public function toTask(int|string $id)
    {
        $error = null;
        $this->db->action(function() use(&$error, $id) {
            try {
                $taskId = $this->db->get(self::TABLE, "task_id", ["id" => $id]);
                $projectId = $this->db->get(Task::TABLE, "project_id", ["id" => $taskId]);
                $newTaskId = (new Task($this->db))->newTask(new TaskDto($projectId));

                $this->db->update(Detalle::TABLE, [
                    "detail_id" => $newTaskId,
                    "detail_type" => Task::TYPE,
                ], [
                    "detail_id" => $id,
                    "detail_type" => Subtask::TYPE,
                ]);

                $this->updateObsToTask($newTaskId, $id);
            } catch (\Exception $e) {
                $error = $e;
                return false;
            }
        });

        if ($error !== null) throw $error;
        return true;
    }

    /**
     * Actualiza las observaciones de una sub-tarea a una tarea. Utilizado
     * cuando se convierte una sub-tarea en tarea. #\_( . _.)_/
     *
     * @param int|string $id El id de la nueva tarea.
     * @param int|string $pastId El antiguo Id de la sub-tarea
    */
    protected function updateObsToTask(int|string $id, int|string $pastId): bool
    {
        try {
            $this->db->update(Observation::TABLE, [
                "obs_type" => Task::TYPE,
                "obs_id"   => $id
            ], [
                "obs_type" => self::TYPE,
                "obs_id"   => $pastId
            ]);
            return true;
        } catch(\Exception $e) {
            throw $e;
        }
    }
}
