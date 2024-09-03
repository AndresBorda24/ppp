<?php
declare(strict_types=1);

namespace App\Http\Middleware;

use App\Http\Requests\FormValidationException;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Container\ContainerInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;

class ApiErrorMiddleware implements MiddlewareInterface
{
    public function __construct(private ContainerInterface $c) { }

    public function process(Request $request, RequestHandler $handler): Response
    {
        try {
            return $handler->handle($request);
        } catch (\Exception $e) {
            $data =  [
                "status" => false,
                "error"  => $e->getMessage(),
            ];

            if ($e instanceof FormValidationException) {
                $data["fields"] = $e->getInvalidFields();
            }

            return new JsonResponse($data, 422);
        }
    }
}
