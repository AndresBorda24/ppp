<?php

namespace App;

use Psr\Container\ContainerInterface;

class SED
{
    public function __construct(
        public ContainerInterface $c
    ) {}

    public function decryption($string)
    {
        $PASS = $this->c->get('app');
        $key = hash('sha256', $PASS['pass_key']);
        $iv  = substr(hash('sha256', $PASS['pass_iv']), 0, 16);
        $output = openssl_decrypt(
            base64_decode($string),
            $PASS['pass_method'],
            $key,
            0,
            $iv
        );
        return $output;
    }
}
