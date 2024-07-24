<?php
declare(strict_types=1);

namespace App\Dto;

class TaskDto
{
    public function __construct(
        public readonly int|string $project_id
    ){}
}
