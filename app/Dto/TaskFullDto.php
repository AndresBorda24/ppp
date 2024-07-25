<?php

declare(strict_types=1);

namespace App\Dto;

class TaskFullDto
{
    public function __construct(
        public readonly int $id,
        public readonly int $detail_id,
        public readonly int $project_id,
        public readonly string $title,
        public readonly string|null $description,
        public readonly string $status,
        public readonly int|string|null $delegate_id,
        public readonly int|string|null $created_by_id,
        public readonly string $priority,
        public readonly string $created_at,
        public readonly string|null $started_at,
        public readonly string $updated_at,
        public readonly string|null $finished_at,
        public readonly string $detail_type
    ) {}

    public static function fromArray(array $data): static
    {
        return new self(
            id           : (int) $data["id"],
            detail_id    : (int) $data["detail_id"],
            project_id   : (int) $data["project_id"],
            title        : $data["title"],
            description  : $data["description"],
            status       : $data["status"],
            delegate_id  : $data["delegate_id"],
            created_by_id: $data["created_by_id"],
            priority     : $data["priority"],
            created_at   : $data["created_at"],
            started_at   : $data["started_at"],
            updated_at   : $data["updated_at"],
            finished_at  : $data["finished_at"],
            detail_type  : $data["detail_type"],
        );
    }
}