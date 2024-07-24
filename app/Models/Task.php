<?php
namespace App\Models;

use Medoo\Medoo;
use App\Dto\TaskDto;
use App\Dto\DetalleDto;

class Task
{
    public const TYPE = "task";
    public const TABLE = "pp_tasks";

    public function __construct(
        public readonly Medoo $db
    ) {}

    /**
     *  @return ?string El id de la nueva tarea
    */
    public function create(TaskDto $taskData, DetalleDto $detalleData): ?string
    {
        $id = null; $error = null;
        $this->db->action(function() use(&$id, &$error, $taskData, $detalleData)  {
            try {
                $taskId = $this->newTask($taskData);

                (new Detalle($this->db))->create(
                    detailId: $taskId,
                    detailType: self::TYPE,
                    data: $detalleData,
                );

                $id = $taskId;
            } catch(\Exception $e) {
                $error = $e;
                return false;
            }
        });

        if ($error !== null) throw $error;
        if ($id === null) throw new \Exception("No se pudo crear la tarea");

        return $id;
    }

    public function update(
        int|string $id,
        TaskDto $taskData,
        DetalleDto $detalleData
    ): bool {
        $error = null;
        $this->db->action(function() use($id, &$error, $taskData, $detalleData)  {
            try {
                // $taskId = $this->updateTask($taskData); // Imprementar

                (new Detalle($this->db))->update(
                    data: $detalleData,
                    id: $id,
                    type: self::TYPE
                );
            } catch(\Exception $e) {
                $error = $e;
                return false;
            }
        });

        if ($error !== null) throw $error;
        if ($id === null) throw new \Exception("No se pudo crear la tarea");

        return true;
    }

    /**
     * Este metodo crea UNICAMENTE el registro en la tabla de tareas mas no
     * genera datos en la tabla de detalles. Cuidado.
     *
     * @return ?string id de la nueva tarea.
    */
    public function newTask(TaskDto $taskData): ?string
    {
        try {
            $this->db->insert(self::TABLE, [
                "project_id" => $taskData->project_id
            ]);
            return $this->db->id();
        } catch(\Exception $e) {
            throw $e;
        }
    }

    /**
     * Elimina un proyecto de a base de datos.
    */
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

    /** Obtiene todas las tareas relacionadas con un Projecto */
    public function getFromProject(int|string $projectId)
    {
        try {
            return $this->db->select(Detalle::TABLE." (D)", [
                    "[>]".self::TABLE." (T)" => [
                        "detail_id" => "id",
                        "AND" => [
                            "detail_type" => self::TYPE
                        ]
                    ]
                ], [
                    "T.id", "D.id (detail_id)",
                    "title", "description", "status", "delegate_id", "created_by_id",
                    "priority", "created_at", "started_at", "updated_at", "finished_at",
                    "detail_type", "detail_id"
                ], [
                    "T.project_id" => $projectId
                ]);
        } catch(\Exception $e) {
            throw $e;
        }
    }

    // public function getProgress(): int
    // {
    //     try {
    //         $finished = $this->detailSelect('pp_sub_tasks', ['count(*)'], [])
    //         ->where('detail_type', "'sub_task'")
    //         ->where('pp_sub_tasks.`task_id`', $this->id, '=', 'AND')
    //         ->where('pp_details.`status`', "'finished'", '=', 'AND')
    //         ->toSql();

    //         $res = $this->selectFrom('pp_sub_tasks', 'COUNT(*) as `Total`', "($finished) as `Finished`")
    //         ->where('task_id', $this->id)
    //         ->get()
    //         ->fetch_assoc();

    //         return ( $res['Total'] == 0 ) ? 101 : intval($res['Finished']) * 100 / intval($res['Total']);
    //     } catch (\Throwable $e) {
    //         echo 'Error: ' . $e->getMessage();
    //         return 1;
    //     }
    // }
}
