<?php
namespace App\Models;

use Medoo\Medoo;

class AreaServicios
{
    public const TABLE = 'area_servicio';

    public function __construct(
        public readonly Medoo $db
    ) {}

    public function getAll(): array
    {
        try {
            return $this->db->select(self::TABLE, ['area_servicio_id', 'area_servicio_nombre']);
        } catch(\Exception $e) {
            throw $e;
        }
    }
}
