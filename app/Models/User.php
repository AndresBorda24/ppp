<?php
namespace App\Models;

use Medoo\Medoo;

class User
{
    const TABLE = 'vista_consultor';

    public function __construct(public readonly Medoo $db) {}
}