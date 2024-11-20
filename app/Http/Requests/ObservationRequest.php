<?php
declare(strict_types=1);

namespace App\Http\Requests;

use App\Enums\ProjectStatus;
use App\Enums\Priority;

class ObservationRequest
{
    public function __construct(public readonly Request $validator) {}

    public function create(array $data)
    {
        return $this->validator->validate($data, [
            "body" => "required"
        ]);
    }
}
