<?php
declare(strict_types = 1);

namespace App\Http\Middleware;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\ServerRequestInterface;

class CorsMiddleware implements MiddlewareInterface
{
    private array $allowedOrigins;

    public function __construct(ContainerInterface $container)
    {
        $appEnv = $container->get('app')['env'] ?? 'dev';
        $this->allowedOrigins = match ($appEnv) {
            'dev' => [
                "http://localhost:5173",
                "http://192.168.0.8:5173"
            ],
            default => []
        };
    }

    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        $response = $handler->handle($request);
        $origin   = @$request->getHeader("Origin")[0];

        if (in_array($origin, $this->allowedOrigins)) {
            $response = $response
                ->withHeader('Access-Control-Allow-Origin', $origin)
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, ngrok-skip-browser-warning')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');
        }

        return $response;
    }
}
