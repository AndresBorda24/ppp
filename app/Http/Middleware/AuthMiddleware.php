<?php
declare(strict_types=1);

namespace App\Http\Middleware;

use App\Services\AuthService;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use UnexpectedValueException;

class AuthMiddleware implements MiddlewareInterface
{
    public function __construct(private AuthService $auth) {}

    public function process(Request $request, RequestHandler $handler): Response
    {
        $contentType = $request->getHeaderLine('Authorization');
        @list($_, $token) = explode(" ", $contentType);

        try {
            if (!$token) throw new \Exception('No token provided');

            $user = $this->auth->validate($token);
            return $handler->handle($request->withAttribute('user', $user));
        } catch(UnexpectedValueException $e) {
            return new JsonResponse([
                'message' => 'Unauthorized',
                'error' => $e->getMessage()
            ], 401);
        }
    }
}
