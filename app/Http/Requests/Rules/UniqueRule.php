<?php
declare(strict_types=1);

namespace App\Http\Requests\Rules;

use Medoo\Medoo;
use Rakit\Validation\Rule;

class UniqueRule extends Rule
{
    protected $message = ":value ya está en uso.";
    protected $fillableParams = ['table', 'column', 'except'];

    public function __construct(
        public readonly Medoo $db
    ){}

    public function check(mixed $value): bool
    {
        // make sure required parameters exists
        $this->requireParameters(['table', 'column']);

        // getting parameters
        $column = $this->parameter('column');
        $table = $this->parameter('table');
        $except = $this->parameter('except');

        if ($except AND $except == $value) {
            return true;
        }

        $res = $this->db->count($table, [
            "AND" => [
                "$column" => $value,
                $column."[!]" => $except
            ]
        ]);

        // true for valid, false for invalid
        return $res === 0;
    }
}
