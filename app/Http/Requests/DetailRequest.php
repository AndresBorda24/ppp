<?php
declare(strict_types=1);

namespace App\Http\Requests;

use App\Enums\Priority;
use App\Enums\ProjectStatus;

/**
 * Validacion para las solicitudes referentes a los proyectos
 */
class DetailRequest
{
    public function __construct(public readonly Request $validator) {}

    public function create(array $data)
    {
        return $this->validator->validate($data, [
            "title"         => "required",
            "description"   => "nullable",
            "status"        => "default:process|required", //Cambiar esto al enum
            "delegate_id"   => "nullable",
            "created_by_id" => "required",
            "priority"      => "default:normal|required", // Tambien esto
            "created_at"    => "default:".date("Y-m-d H:i:s")."|required",
            "started_at"    => "default:".date("Y-m-d H:i:s")."|required",
            "updated_at"    => "default:".date("Y-m-d H:i:s")."|required",
            "finished_at"   => "nullable"
        ]);
    }

    public function patch(array $data)
    {
        $status = implode(',', array_map(fn($s) => $s->value,ProjectStatus::cases()));
        $priorities = implode(',', array_map(fn($p) => $p->value, Priority::cases()));

        return $this->validator->validate($data, [
            "title"         => "min:3",
            "description"   => "nullable",
            "status"        => "in:$status",
            "delegate_id"   => "nullable",
            "created_by_id" => "nullable",
            "priority"      => "in:$priorities",
            "started_at"    => "nullable",
            "finished_at"   => "nullable"
        ]);
    }
}
