<?php

namespace App\Models;

use Medoo\Medoo;
use App\Dto\ObservacionDto;

class Observation
{
    public const TABLE = 'pp_observations';

    public function __construct(
        public readonly Medoo $db
    ) {}

    public function create(ObservacionDto $data): ?string
    {
        try {
            $this->db->insert(self::TABLE, [
                'body' => $data->body,
                'obs_id' => $data->obs_id,
                'obs_type' => $data->obs_type,
                'author_id' => $data->author_id,
            ]);

            return $this->db->id();
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function remove(int|string $id): bool
    {
        try {
            $this->db->delete(self::TABLE, ["id" => $id]);
            return true;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * Obtiene todas las observaciones relacionadas a un proyecto
     * @return array
    */
    public function getAllForProject(int|string $projectId)
    {
        try {
            return $this->db->select(self::TABLE." (O)", [
                "[>]".Detalle::TABLE." (D)" => [
                    "obs_type" => "detail_type",
                    "obs_id"   => "detail_id"
                ]
            ],[
                "O.id", "title", "O.body", "author_id", "O.created_at", "obs_type", "obs_id"
            ], [
                "O.project_id" => $projectId,
                "ORDER" => [
                    "created_at" => "DESC"
                ]
            ]);
        } catch(\Exception $e) {
            throw $e;
        }
    }

    /**
     * Obtiene las observaciones entre las fechas establecidas.
     * @return array
    */
    public function getLog(?string $before, ?string $after )
    {
        $before = $before ?? date("Y-m-d", strtotime("+1 day"));
        $after =  $after  ?? date("Y-m-d", strtotime("-30 days"));

        try {
            return $this->db->select(self::TABLE." (O)", [
                "[>]".Detalle::TABLE." (D)" => [
                    "obs_id" => "D.detail_id",
                    "obs_type" => "D.detail_type"
                ],
                "[>]".Subtask::TABLE." (ST)" => [
                    "D.detail_id" => "ST.id",
                    "D.detail_type" => Subtask::TYPE
                ],
                "[>]".Project::TABLE." (P)" => [
                    "O.project_id" => "P.id"
                ]
            ], [
                "O.body", "O.obs_type (type)", "D.title", "O.author_id", "O.created_at",
                "D.detail_id", "ST.task_id", "O.project_id", "slug",
                "project" => Medoo::raw("SELECT <title> FROM pp_details WHERE <detail_id> = O.<project_id> AND <detail_type> = 'project' LIMIT 1"),
            ], [
               "O.project_id[!]" => null,
               "O.created_at[<>]" => [$before, $after]
            ]);
        } catch(\Exception $e) {
            throw $e;
        }
    }
}
