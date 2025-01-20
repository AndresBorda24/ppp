<?php

namespace App\Models;

use Medoo\Medoo;
use App\Dto\CommentDto;

class Observation
{
    public const TABLE = 'pp_observations';

    public function __construct(
        public readonly Medoo $db
    ) {}

    public function create(CommentDto $data): ?array
    {
        try {
            $this->db->insert(self::TABLE, [
                'body' => $data->body,
                'obs_id' => $data->obs_id,
                'obs_type' => $data->obs_type->value,
                'author_id' => $data->author_id,
                'project_id' => $data->project_id,
            ]);

            return $this->find(["O.id" => $this->db->id()]);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function find(array $where): ?array
    {
        return $this->db->get(self::TABLE." (O)", [
            "[>]".Detalle::TABLE." (D)" => [
                "obs_type" => "detail_type",
                "obs_id"   => "detail_id"
            ],
            "[>]".User::TABLE." (U)" => [
                "O.author_id" => "usuario_id"
            ],
        ],[
            "O.id", "title", "O.body", "author_id", "O.created_at", "obs_type", "obs_id",
            "author_name" => User::getUserFullNameSql("U")
        ], $where);
    }

    /**
     * Obtiene todas las observaciones relacionadas a un proyecto
     * @return array
    */
    public function getAllForProject(int|string $projectId)
    {
        try {
            return $this->db->select(self::TABLE." (O)", [
                "[>]".User::TABLE." (U)" => [
                    "O.author_id" => "usuario_id"
                ],
                "[>]".Detalle::TABLE." (D)" => [
                    "obs_type" => "detail_type",
                    "obs_id"   => "detail_id"
                ]
            ],[
                "O.id", "title", "O.body", "author_id", "O.created_at", "obs_type", "obs_id",
                "author_name" => Medoo::raw(
                    "CONCAT_WS(' ', <usuario_nombre1>, <usuario_nombre2>, <usuario_apellido1>, <usuario_apellido2>)"
                ),
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

    public function remove(array $where): bool
    {
        $result = $this->db->delete(self::TABLE, $where);
        return ($result?->rowCount() ?? 0) > 0;
    }
}
