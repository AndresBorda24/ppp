<?php
declare(strict_types=1);

namespace App\Http\Requests;

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
}
