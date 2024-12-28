<?php

declare(strict_types=1);

namespace App\Http\Requests;

class AuthRequest
{
    public function __construct(public readonly Request $validator) {}

    public function validate(array $data)
    {
        return $this->validator->validate($data, [
            "username" => "required",
            "password" => "required"
        ]);
    }
}
