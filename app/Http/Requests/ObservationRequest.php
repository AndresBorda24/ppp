<?php
declare(strict_types=1);

namespace App\Http\Requests;

use App\Enums\DetailType;
use App\Enums\ProjectStatus;
use App\Enums\Priority;

class ObservationRequest
{
    public function __construct(public readonly Request $validator) {}

    public function create(array $data)
    {
        $types = implode(
            ",", array_map(fn($t) => $t->value, DetailType::cases())
        );

        return $this->validator->validate($data, [
            "body" => "required",
            "project_id" => "required|numeric",
            "obs_type" => "required|in:$types",
            "obs_id" => "required|numeric",
            "author_id" => "required|numeric"
        ]);
    }
}
