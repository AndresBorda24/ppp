<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Dto\ObservacionDto;
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

    public function addProjectObservation(
        Request $request,
        ObservationRequest $r,
        int $projectId
    ): Response {
        $body = $request->getParsedBody();
        $data = $r->create($body);

        $obs = new ObservacionDto(
            body: $data['body'],
            created_at: '',
            obs_id: $projectId,
            obs_type: \App\Models\Project::TYPE,
            author_id: 0
        );

        return new JsonResponse([]);
    }
}
