<?php
declare(strict_types=1);

namespace App\Http\Requests;

use Rakit\Validation\Validator;
use App\Http\Requests\Rules\UniqueRule;

class Request
{
    public function __construct(
        private UniqueRule $uniqueRule,
        protected Validator $validator
    ) {
        $this->setMessages();
        $this->validator->addValidator("unique", $this->uniqueRule);
    }

    /**
     * Valida la informacion de data contra las reglas pasadas como
     * parametro.
     *
     * @throws FormValidationException Si alguna de las validaciones falla.
     * @return array Valid data
    */
    public function validate(array $data, array $rules): array {
        $validation = $this->validator->validate($data, $rules);

        if ($validation->fails()) {
            $errors = $validation->errors();

            throw new FormValidationException(
                $errors->toArray()
            );
        }

        return $validation->getValidData();
    }

    /**
     * Establece los mensajes de error en spanish.
     * @param array $messages Array con los mensajes de error.
    */
    protected function setMessages(array $messages = [])
    {
        $msg = array_merge($messages, [
            "required" => "Valor es requerido.",
            "email" => "Debe ser un correo valido. O ya está en uso.",
            "min" => "Debe tener una longitud mayor.",
            "date" => "Fecha no valida.",
            "same" => "El valor no coincide.",
            "digits_between" => "Debe tener una longitud entre :min y :max. Y ser un número."
        ]);

        $this->validator->setMessages($msg);
    }
}
