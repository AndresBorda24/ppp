<?php

declare(strict_types=1);

namespace App\Services;

use App\Dto\UserDto;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Container\ContainerInterface;

class AuthService
{
    private string $secret;

    public function __construct(
        public readonly ContainerInterface $c,
        public readonly User $user
    ) {
        $this->secret = $this->c->get('app')['secret'];
    }

    public function buildToken(UserDto $user): string
    {
        $payload = [
            'sub'  => (string) $user->id,
            'iss'  => $this->c->get('app')['url'],
            'iat'  => time(),
            'exp'  => strtotime('+8 days midnight'),
            'user' => $user
        ];

        return JWT::encode($payload, $this->secret, 'HS256');
    }

    public function validate(string $token)
    {
        $decoded = JWT::decode($token, new Key($this->secret, 'HS256'));
        $decoded->user->clave = '********';
        $user = \App\Dto\UserDto::fromArray((array) $decoded->user);

        return $this->user->find(['usuario_id' => $user->id]);
    }
}
