<?php
declare(strict_types=1);

namespace App\Dto;

class ProjectDto
{
    public function __construct(
        public readonly string $estimated_time,
        public readonly string $slug,
        public readonly ?string $due_date,
    ) {}
}
