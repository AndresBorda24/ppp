<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Dto\DetalleDto;
use App\Http\Requests\DetailRequest;
use App\Models\Subtask;
use App\Models\Task;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class SubtaskController
{
    public function __construct(
        public Subtask $subtask
    ) {}

    public function create(Request $request, int $taskId, DetailRequest $DR): Response
    {
        $data = $DR->create($request->getParsedBody());
        $detailDto = DetalleDto::fromArray($data);
        $newSubtaskId = $this->subtask->create($taskId, $detailDto);

        return new JsonResponse($this->subtask->getOne(["S.id" => $newSubtaskId]));
    }

    public function getAllForTask(int $taskId): Response
    {
        return new JsonResponse($this->subtask->findForTask($taskId));
    }

    public function update(Request $request, int $id, DetailRequest $DR): Response
    {
        $data = $DR->create($request->getParsedBody());
        $detailDto = DetalleDto::fromArray($data);
        $this->subtask->update($id, $detailDto);

        return new JsonResponse($this->subtask->getOne(["S.id" => $id]));
    }

    public function findOne(int $id): Response
    {
        return new JsonResponse($this->subtask->getOne(["S.id" => $id]));
    }

    public function toTask(int $id): Response
    {
        $taskId = $this->subtask->toTask($id);

        return new JsonResponse(
            (new Task($this->subtask->db))->getOne(["T.id" => $taskId])
        );
    }

    public function delete(int $id): Response
    {
        return new JsonResponse($this->subtask->remove($id));
    }

    public function patch(Request $request, int $id, DetailRequest $PR): Response
    {
        $body = $request->getParsedBody();
        $data = array_intersect_assoc($PR->patch($body), $body);
        $this->subtask->patch($id, $data);
        $subtask = $this->subtask->getOne(["S.id" => $id]);
        return new JsonResponse($subtask);
    }
}
