<?php
declare(strict_types=1);

namespace App\Http\Requests;

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
            "status"        => "default:new|required", //Cambiar esto al enum
            "delegate_id"   => "nullable",
            "created_by_id" => "nullable",
            "priority"      => "default:normal|required", // Tambien esto
            "created_at"    => "default:".date("Y-m-d H:i:s")."|required",
            "started_at"    => "nullable",
            "updated_at"    => "default:".date("Y-m-d H:i:s")."|required",
            "finished_at"   => "nullable"
        ]);
    }
}
