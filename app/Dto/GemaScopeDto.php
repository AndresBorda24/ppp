<?php
declare(strict_types=1);

namespace App\Dto;

class GemaScopeDto
{
    public function __construct(
        public readonly string $scope,
        public readonly bool $visible = true
    ) {}
}
