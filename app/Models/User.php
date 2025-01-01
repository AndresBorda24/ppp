<?php

namespace App\Models;

use App\Dto\UserDto;
use Medoo\Medoo;

class User
{
    const TABLE = 'usuario';

    public function __construct(public readonly Medoo $db) {}

    public static function getUserFullNameSql(string $sufix)
    {
        $SQL = str_replace(
            "%s",
            $sufix,
            "CONCAT_WS(' ', %s.<usuario_nombre1>, %s.<usuario_nombre2>, %s.<usuario_apellido1>, %s.<usuario_apellido2>)"
        );
        return Medoo::raw($SQL);
    }

    public function find(array $where): ?UserDto
    {
        $userInfo = $this->db->get(self::TABLE . ' (U)', [
            '[>]area_servicio (A)' => "area_servicio_id"
        ], [
            'U.usuario_id (id)',
            'nombre' => Medoo::raw("CONCAT_WS(' ', <usuario_nombre1>, <usuario_nombre2>, <usuario_apellido1>, <usuario_apellido2>)"),
            'U.usuario_documento (documento)',
            'U.area_servicio_id (area_id)',
            'A.area_servicio_nombre (area_nombre)',
            'U.usuario_clave (clave)'
        ], $where);

        return (!$userInfo || !is_array($userInfo))
            ? null
            : UserDto::fromArray($userInfo);
    }
}
