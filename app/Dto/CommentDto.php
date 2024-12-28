<?php
declare(strict_types=1);

namespace App\Dto;

use App\Enums\DetailType;

class CommentDto
{
    public function __construct(
        public readonly string $body,
        public readonly string $created_at,
        public readonly DetailType $obs_type,
        public readonly int|string $author_id,
        public readonly int|string $obs_id,
        public readonly int $project_id
    ) {}

    public static function fromArray(array $data): static
    {
        if (! $data["obs_type"] instanceof DetailType) {
            $data["obs_type"] = DetailType::from($data["obs_type"]);
        }

        return new static(
            body: $data["body"],
            created_at: @$data["created_at"] ?? "",
            obs_type: $data["obs_type"],
            obs_id: $data["obs_id"],
            author_id: $data["author_id"],
            project_id: $data["project_id"]
        );
    }
}
