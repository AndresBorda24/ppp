<?php
declare(strict_types=1);

namespace App\Http\Requests;

use App\Enums\ProjectStatus;
use App\Enums\Priority;

/**
 * Validacion para las solicitudes referentes a los proyectos
 */
class ProjectRequest
{
    public function __construct(public readonly Request $validator) {}

    public function update(array $data)
    {
        return $this->validator->validate($data, [
            "due_date" => "nullable",
            "estimated_time" => "required"
        ]);
    }

    public function patch(array $data)
    {
        $status = implode(',', array_map(fn($s) => $s->value,ProjectStatus::cases()));
        $priorities = implode(',', array_map(fn($p) => $p->value, Priority::cases()));

        return $this->validator->validate($data, [
            "due_date"      => "nullable",
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
