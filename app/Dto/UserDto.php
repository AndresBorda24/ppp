<?php

declare(strict_types=1);

namespace App\Dto;

class UserDto
{
    public function __construct(
        public int $id,
        public string $nombre,
        public string $documento,
        public int $area_id,
        public string $area_nombre,
        private string $clave
    ) {}

    public function getClave(): string
    {
        return $this->clave;
    }

    public static function fromArray(array $data): self
    {
        return new self(
            (int) $data['id'],
            $data['nombre'],
            (string) $data['documento'],
            (int) $data['area_id'],
            $data['area_nombre'],
            $data['clave']
        );
    }
}
