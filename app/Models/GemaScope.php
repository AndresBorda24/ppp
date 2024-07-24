<?php
namespace App\Models;

use Medoo\Medoo;
use App\Dto\GemaScopeDto;

class GemaScope
{
    public const TABLE = "pp_gema_scopes";

    public function __construct(
        public readonly Medoo $db
    ) {}

    public function scopeExists(string $scope)
    {
        try {
            return $this->db->has(self::TABLE, ["scope" => $scope]);
        } catch(\Exception $e) {
            throw $e;
        }
    }

    /** @return string ID del registro creado */
    public function create(GemaScopeDto $data): ?string
    {
        try {
            $this->db->insert(self::TABLE, [
                "scope" => $data->scope,
                "visible" => $data->visible
            ], "id");

            return $this->db->id();
        } catch(\Exception $e) {
            throw $e;
        }
    }

    /** @return string ID del registro creado */
    public function remove(int|string $id): bool
    {
        try {
            $this->db->delete(self::TABLE, ["id" => $id]);
            return true;
        } catch(\Exception $e) {
            throw $e;
        }
    }

    /** Establece la visibilidad de un estado */
    public function setVisible(int|string $id, bool $isVisible): bool
    {
        try {
            $this->db->update(self::TABLE, [
                "visible" => $isVisible
            ], ["id" => $id]);
            return true;
        } catch(\Exception $e) {
            throw $e;
        }
    }
}
