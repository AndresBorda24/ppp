<?php
declare(strict_types=1);

namespace App\Http\Requests;

final class FormValidationException extends \Exception
{
    public function __construct(private array $failFields)
    {
        parent::__construct("Invalid Data", 40024);
    }

    /**
     * Retorna los campos que sean invalidos.
    */
    public function getInvalidFields(): array
    {
        return array_map(fn($val) => array_values($val), $this->failFields);
    }
}
