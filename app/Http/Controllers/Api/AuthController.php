<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use App\SED;
use App\Services\AuthService;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AuthController
{
    public function __construct(
        private AuthService $authService,
        private User $user,
        private SED $SED
    ) {}

    public function login(Request $request, AuthRequest $r): Response
    {
        $body = $request->getParsedBody();
        $validatedData = $r->validate($body);
        $user = $this->user->find([
            'usuario_usuario' => $validatedData['username'],
            'usuario_estado' => 'A',
            'area_servicio_id' => 20 // Hardcoded value: Modificar esto!!
        ]);

        if (!$user || $this->SED->decryption($user->getClave()) !== $validatedData['password']) {
            return new JsonResponse(['error' => 'Invalid credentials'], 401);
        }

        $token = $this->authService->buildToken($user);
        return new JsonResponse(['token' => $token]);
    }
}
