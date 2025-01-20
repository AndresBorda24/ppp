<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Dto\CommentDto;
use App\Dto\UserDto;
use App\Http\Requests\ObservationRequest;
use App\Models\Observation;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ObservationController
{
    public function __construct(
        private Observation $obs
    ) {}

    public function loadProjectObs(int $projectId): Response
    {
        $obs = $this->obs->getAllForProject($projectId);
        return new JsonResponse($obs);
    }

    public function createComment(Request $request, ObservationRequest $r): Response
    {
        $body = $request->getParsedBody();
        $validatedData = $r->create($body);

        $comment = CommentDto::fromArray($validatedData);
        $comment = $this->obs->create($comment);

        return new JsonResponse($comment);
    }

    public function deleteComment(UserDto $user, int $id): Response
    {
        $comment = $this->obs->find(['O.id' => $id]);

        if (! $comment) return new JsonResponse(["error" => "Not found"], 404);
        if ($comment['author_id'] !== $user->id) return new JsonResponse([
            "error" => "No autorizado."
        ], 401);

        return new JsonResponse([
            "status" => $this->obs->remove([ 'id' => $id ])
        ]);
    }
}
