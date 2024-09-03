<?php
declare(strict_types=1);

namespace App\Models;

use Medoo\Medoo;
use App\Dto\DetalleDto;

class Detalle
{
    public const TABLE = "pp_details";

    public function __construct(
        public readonly Medoo $db
    ){}

    /**
     * Registra la informacion de un detalle
     *
     * @return ?string Nuevo ID
    */
    public function create(
        int|string $detailId,
        string $detailType,
        DetalleDto $data
    ): ?string {
        try {
            $this->db->insert(self::TABLE, [
                "title"         => $data->title,
                "description"   => $data->description,
                "status"        => $data->status,
                "delegate_id"   => $data->delegate_id,
                "created_by_id" => $data->created_by_id,
                "priority"      => $data->priority,
                "created_at"    => $data->created_at,
                "started_at"    => $data->started_at,
                "updated_at"    => $data->updated_at,
                "finished_at"   => $data->finished_at,
                // ----------------------------------
                "detail_type"   => $detailType,
                "detail_id"     => $detailId
            ]);

            return $this->db->id();
        } catch(\Exception $e) {
            throw $e;
        }
    }

    /**
     * @param mixed $id Valor del campo del where
     * @param string $field Nombre del campo por el cual hacer el where
     */
    public function update(
        DetalleDto $data,
        mixed $id,
        string $type
    ): bool {
        try {
            $this->db->update(self::TABLE, [
                "title"         => $data->title,
                "description"   => $data->description,
                "status"        => $data->status,
                "delegate_id"   => $data->delegate_id,
                "created_by_id" => $data->created_by_id,
                "priority"      => $data->priority,
                "started_at"    => $data->started_at,
                "finished_at"   => $data->finished_at
            ], [
                "detail_id" => $id,
                "detail_type" => $type
            ]);

            return true;
        } catch(\Exception $e) {
            throw $e;
        }
    }

    /** Elimina el registro de un detalle */
    public function remove(mixed $id, string $type): bool
    {
        try {
            $this->db->delete(self::TABLE, [
                "detail_id" => $id,
                "detail_type" => $type
            ]);
            return true;
        } catch(\Exception $e) {
            throw $e;
        }
    }

    /**
     * Elimina los detalles de las tareas y subtareas que esten huerfanos. Esto
     * pasa principalmente luego de eliminar un proyecto.
    */
    public function cleanUp(): bool
    {
        try {
            $types = [
                Task::TYPE => Task::TABLE,
                Subtask::TYPE => Subtask::TABLE
            ];

            foreach($types as $type => $table) {
                $this ->db
                    ->query("
                    DELETE FROM <pp_details>
                    WHERE <detail_type> = :type
                    AND <detail_id> NOT IN (
                        SELECT <id> FROM $table
                    )", [ ":type" => $type ]);
            }

            return true;
        } catch(\Exception $e) {
            throw $e;
        }
    }

    /**
     * Actualiza la informacion de ciertos campos del detalle.
     */
    public function patch(array $where, array $data): bool
    {
        return (bool) $this->db->update(self::TABLE, $data, $where);
    }

    /**
     * Returna el listado de los campos del detalle.
    */
    public static function getFields(
        ?string $suffix = null,
        ?array $except = null,
        ?array $only = null
    ): array {
        $fields = ['title','description','status','delegate_id','created_by_id','priority', 'created_at','started_at','updated_at','finished_at','detail_type','detail_id'];

        if ($except !== null) {
            $fields = array_filter($fields, fn($i) => ! in_array($i, $except));
        }

        if ($only !== null) {
            $fields = array_filter($fields, fn($i) => in_array($i, $only));
        }

        if ($suffix !== null) {
            $fields = array_map(fn($i) => "$suffix.$i", $fields);
        }

        return $fields;
    }
}
