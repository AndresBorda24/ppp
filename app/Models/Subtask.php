<?php
namespace App\Models;

use App\Dto\DetalleDto;
use App\Dto\TaskDto;
use App\Dto\SubtaskFullDto;
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
    public function toTask(int|string $id): int
    {
        $error = null;
        $newTaskId = null;
        $this->db->action(function() use(&$error, &$newTaskId, $id) {
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
        if ($newTaskId ===  null) throw new \RuntimeException("No se podido convertir la subtarea en tarea.");

        try {
            $this->remove($id);
        } catch (\Exception) {}

        return (int) $newTaskId;
    }

    public function create(int $taskId, DetalleDto $data): int
    {
        $error = null; $id = null;
        $this->db->action(function() use(&$error, &$id, $taskId, $data) {
            try {
                $id = $this->newSubTask($taskId);
                (new Detalle($this->db))->create(
                    data: $data,
                    detailId: $id,
                    detailType: self::TYPE
                );
            } catch (\Exception $e) {
                $error = $e;
                return false;
            }
        });

        if ($error !== null) throw $error;
        if ($id === null) throw new \RuntimeException("Error al crear subtarea");

        return (int) $id;
    }

    public function update(int $id, DetalleDto $data): bool
    {
        $error = null;
        $this->db->action(function() use(&$error, &$id, $data) {
            try {
                (new Detalle($this->db))->update(
                    id: $id,
                    data: $data,
                    type: self::TYPE
                );
            } catch (\Exception $e) {
                $error = $e;
                return false;
            }
        });

        if ($error !== null) throw $error;
        return true;
    }

    /** Elimina una subtarea de la base de datos.  */
    public function remove(string|int $id)
    {
        $error = null;
        $this->db->action(function() use($id, &$error) {
            try {
                $this->db->delete(self::TABLE, ["id" => $id]);

                $detalle = new Detalle($this->db);
                $detalle->cleanUp();
            } catch(\Exception $e) {
                $error = $e;
                return false;
            }
        });

        if ($error !== null) throw $error;

        return true;
    }
    /**
     * Obtiene el listado de todas las subtareas para una tarea en especifico
     * @return array
    */
    public function findForTask(int $taskId)
    {
        return $this->db->select(Detalle::TABLE." (D)", [
            "[>]".self::TABLE." (S)" => [
                "detail_id" => "id",
                "AND" => [
                    "detail_type" => self::TYPE
                ]
            ]
        ], [
            "S.id", "D.id (detail_id)", "S.task_id",
            "title", "description", "status", "delegate_id", "created_by_id",
            "priority", "created_at", "started_at", "updated_at", "finished_at",
            "detail_type", "detail_id"
        ], ["S.task_id" => $taskId]);
    }

    /** Obtiene la informacion completa para una subtarea */
    public function getOne(array $where): ?SubtaskFullDto
    {
        $data = $this->db->get(Detalle::TABLE." (D)", [
            "[>]".self::TABLE." (S)" => [
                "detail_id" => "id",
                "AND" => [
                    "detail_type" => self::TYPE
                ]
            ]
        ], [
            "S.id", "D.id (detail_id)", "S.task_id",
            "title", "description", "status", "delegate_id", "created_by_id",
            "priority", "created_at", "started_at", "updated_at", "finished_at",
            "detail_type", "detail_id"
        ], $where);

        return $data
            ? SubtaskFullDto::fromArray($data)
            : null;
    }

    /**
     * Crea una nueva Sub-tarea y retorna su id
    */
    public function newSubTask(int $taskId): int
    {
        $this->db->insert(self::TABLE, [ "task_id" => $taskId ]);
        return (int) $this->db->id();
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

    /**
     * Actuliza la información de ciertos campos de la tarea
     *
     * @param array $data Contiene la informacion a actualizar. Llave: nombre
     *                    del campo, Valor: valor.
     */
    public function patch(int $id, array $data): bool
    {
        $details = new Detalle($this->db);

        foreach ($data as $field => $value) {
            $details->patch([
                'detail_type' => self::TYPE,
                'detail_id'   => $id
            ], [$field => $value]);
        }

        return true;
    }
}
