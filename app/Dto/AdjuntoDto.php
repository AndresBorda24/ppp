<?php
declare(strict_types=1);

namespace App\Dto;

class AdjuntoDto
{
    public function __construct(
        public readonly int $project_id,
        public readonly string $path,
        public readonly string $name,
        public readonly string $type
    ) {}
}
