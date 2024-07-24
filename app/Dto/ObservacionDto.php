<?php
declare(strict_types=1);

namespace App\Dto;

class ObservacionDto
{
    public function __construct(
        public readonly string $body,
        public readonly string $created_at,
        public readonly string $obs_type,
        public readonly int|string $author_id,
        public readonly int|string $obs_id
    ) {}
}
