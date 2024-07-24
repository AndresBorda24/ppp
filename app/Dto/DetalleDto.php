<?php
declare(strict_types=1);

namespace App\Dto;

class DetalleDto
{
    public function __construct(
        public readonly string $title,
        public readonly string|null $description,
        public readonly string $status,
        public readonly int|string|null $delegate_id,
        public readonly int|string|null $created_by_id,
        public readonly string $priority,
        public readonly string $created_at,
        public readonly string|null $started_at,
        public readonly string $updated_at,
        public readonly string|null $finished_at
    ) {}
}
