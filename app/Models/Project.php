<?php
namespace App\Models;

use Medoo\Medoo;
use App\Dto\ProjectDto;
use App\Dto\DetalleDto;

class Project
{
    public const TYPE = "project";
    public const TABLE = "pp_projects";

    public function __construct(
        public readonly Medoo $db
    ) {}

    /**
     * Busca los proyectos basado en su titulo.
     * @param string $search Titulo a buscar
     * @return array
    */
    public function searchBox(string $search)
    {
        try {
            return $this->db->select(self::TABLE." (P)", [
                "[>]".Detalle::TABLE." (D)" => ["id" => "detail_id"]
            ], [
                "p.id", "slug", ...Detalle::getFields("D", only: ["title"])
            ], [
                "AND" => [
                    "title[~]" => $search,
                    "detail_type" => self::TYPE
                ]
            ]);
        } catch(\Exception $e) {
            throw $e;
        }
    }

    /**
     * Retorna un listado de Proyectos paginados. Home page
     * @return array
    */
    public function pagination(
        ?string $title  = "",
        ?int $page      = 1,
        ?int $amount    = 10,
        ?string $status = "",
        ?string $field  = "P.id",
        ?string $order  = "desc"
    ) {
        try {
            $where = [
                "D.status[~]" => $status,
                "detail_type" => self::TYPE,
                "title[~]"    => $title
            ];

            $total = $this->db->count(self::TABLE." (P)", [
                "[>]".Detalle::TABLE." (D)" => ["id" => "detail_id"]
            ], "D.id",  $where);

            $page = (bool) $page ? $page : 1;
            $offset = ($page * $amount) - $amount;

            if ($offset > $total) {
                $page = 1;
                $offset = 0;
            }

            $data = $this->db->select(self::TABLE." (P)", [
                "[>]".Detalle::TABLE." (D)" => ["id" => "detail_id"]
            ], [
                "P.id", "slug", ...Detalle::getFields("D", only: [
                    "title", "description", "status", "priority", "created_at"
                ])
            ], [
                "AND" => $where,
                "LIMIT" => [$offset, $amount],
                "ORDER" => [$field => strtoupper($order)]
            ]);

            return [
                "data" => $data,
                "pagination" => [
                    "current_page" => $page,
                    "last_page" => ceil($total / $amount),
                    "items" => [
                        "count" => $data ? count($data) : 0,
                        "total" => $total,
                        "per_page" => $amount,
                    ]
                ]
            ];
        } catch(\Exception $e) {
            throw $e;
        }
    }

    /**
     * Obtiene infirmacion basica sobre el proyecto
     *
     * @return array Datos de proyecto
     * @return null Si no existe
    */
    public function getBasic(string|int $id)
    {
        return $this->db->get(self::TABLE." (P)", [
            "[>]".Detalle::TABLE." (D)" => ["id" => "detail_id"]
        ], [
            "P.id", "P.slug", ...Detalle::getFields("D", only: [
                "title", "description", "status", "priority", "created_at"
            ])
        ], [
            "D.detail_type" => self::TYPE,
            "D.detail_id"   => $id
        ]);
    }

    public function create(ProjectDto $projectData, DetalleDto $detalleData): ?array
    {
        $id = null; $error = null;
        $this->db->action(function() use(&$id, &$error, $projectData, $detalleData)  {
            try {
                $projectId = $this->newProject($projectData);

                (new Detalle($this->db))->create(
                    detailId: $projectId,
                    detailType: self::TYPE,
                    data: $detalleData,
                );

                $id = $projectId;
            } catch(\Exception $e) {
                $error = $e;
                return false;
            }
        });

        if ($error !== null) throw $error;
        if ($id === null) throw new \Exception("No se pudo crear el proyecto");

        return $this->getBasic($id);
    }

    public function update(
        string|int $id,
        ProjectDto $projectData,
        DetalleDto $detalleData
    ): bool {
        $error = null;
        $this->db->action(function() use($id, &$error, $projectData, $detalleData) {
            try {
                $this->updateProject($id, $projectData);

                (new Detalle($this->db))->update(
                    id: $id,
                    type: self::TYPE,
                    data: $detalleData,
                );
            } catch(\Exception $e) {
                $error = $e;
                return false;
            }
        });

        if ($error !== null) throw $error;

        return true;
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
                (new Adjunto($this->db))->removeDir((int) $id);

                $detalle = new Detalle($this->db);
                $detalle->remove($id, self::TYPE);
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
     * Este metodo crea UNICAMENTE el registro en la tabla de tareas mas no
     * genera datos en la tabla de detalles. Cuidado.
     *
     * @return ?string id de la nueva tarea.
    */
    public function newProject(ProjectDto $projectData): ?string
    {
        try {
            $this->db->insert(self::TABLE, [
                "slug" => $projectData->slug,
                "due_date" => $projectData->due_date,
                "estimated_time" => $projectData->estimated_time,
            ]);
            return $this->db->id();
        } catch(\Exception $e) {
            throw $e;
        }
    }

    /**
     * Actualiza el resgistro de la tabla self::TABLE pero no su detalle.
    */
    public function updateProject(string|int $id, ProjectDto $projectData): bool
    {
        try {
            $this->db->update(self::TABLE, [
                "slug" => $projectData->slug,
                "due_date" => $projectData->due_date,
                "estimated_time" => $projectData->estimated_time,
            ], ["id" => $id]);
            return true;
        } catch(\Exception $e) {
            throw $e;
        }
    }

    /**
     * Calcula el progreso del proyecto basado en las tareas que esten
     * marcadas como finalizadas. Si no hay tareas relacionadas
     * retornará 101
     *
     * @return int
     */
    // public function getProgress(): float
    // {
    //     try {
    //         $finished = $this->detailSelect('pp_tasks', [], ['status', 'priority'])
    //         ->where('pp_tasks.`project_id`', $this->id)
    //         ->get()
    //         ->fetch_all(MYSQLI_NUM);

    //         $data = ["steps" => 0, "stepsDone" => 0];

    //         $sumValue = function (&$data, $status, $add)  {
    //             $data["steps"] += $add;
    //             if ($status == 'finished') $data["stepsDone"] += $add;
    //         };

    //         foreach ($finished as $task) {
    //             switch ($task[1]) {
    //                 case 'normal':
    //                     $sumValue($data, $task[0], 2);
    //                     break;
    //                 case 'high':
    //                     $sumValue($data, $task[0], 3);
    //                     break;
    //                 case 'low':
    //                 default:
    //                     $sumValue($data, $task[0], 1);
    //                     break;
    //             }
    //         }

    //         if ($data["steps"] === 0) return 101;

    //         return round(
    //             $data["stepsDone"] * 100 / $data['steps'],
    //             1
    //         );
    //     } catch (\Throwable $e) {
    //         // echo 'Error: ' . $e->getMessage();
    //         return 1;
    //     }
    // }

    /**
     * Genera un slug para el proyecto basado en su titulo.
     */
    public function generateSlug( $text )
    {
        $text = preg_replace('~[^\\pL\d]+~u', '-', $text);
        $text = trim($text, '-');
        $text = iconv('utf-8', 'ASCII//IGNORE//TRANSLIT', $text);
        $text = strtolower(trim($text));
        $text = preg_replace('~[^-\w]+~', '', $text);
        $text = $text . '-' .substr( md5( time() ), 0, 6 );

        return $text;
    }

    /**
     * Sobreescribimos el metodo estatico findById para
     * que encuentre tambien los campos de la tabla details
     */
    public function findBySlug(string $slug)
    {
        try {
            return $this->db->get(self::TABLE." (P)", [
                "[>]".Detalle::TABLE." (D)" => [
                    "P.id" => "detail_id",
                    'AND' => [
                        "detail_type" => self::TYPE
                    ]
                ],
                "[>]".User::TABLE." (A)" => [
                    "D.created_by_id" => "usuario_id"
                ],
                "[>]".User::TABLE." (DE)" => [
                    "D.delegate_id" => "usuario_id"
                ]
            ], [
                "P.id", 'estimated_time', 'due_date', 'slug',
                "author_name" => User::getUserFullNameSql("A"),
                "delegated_name" => User::getUserFullNameSql("DE"),
                ...Detalle::getFields("D"),
            ], [
                "slug" => $slug
            ]);
        } catch(\Exception $e) {
            throw $e;
        }
    }
    /**
     * Actuliza la información de ciertos campos del projecto junto con su
     * detalle.
     *
     * @param array $data Contiene la informacion a actualizar. Llave: nombre
     *                    del campo, Valor: valor.
     */
    public function patch(int $id, array $data): bool
    {
        $details = new Detalle($this->db);
        $projectFields = ['due_date', 'estimated_time'];

        foreach ($data as $field => $value) {
            if (in_array($field, $projectFields)) {
                $this->db->update(self::TABLE, [
                    $field => $value
                ], ['id' => $id]);
                continue;
            }

            $details->patch([
                'detail_type' => self::TYPE,
                'detail_id'   => $id
            ], [$field => $value]);
        }
        return true;
    }
}
