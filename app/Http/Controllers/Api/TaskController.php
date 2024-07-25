<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Dto\DetalleDto;
use App\Dto\TaskDto;
use App\Http\Requests\DetailRequest;
use App\Models\Task;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class TaskController
{
    public function __construct(private Task $task) { }

    public function getAllForProject(int $projectId): Response
    {
        $tasks = $this->task->getFromProject($projectId);
        return new JSonResponse($tasks);
    }

    public function findOne(int $id): Response
    {
        return new JsonResponse($this->task->getOne(["T.id" => $id]));
    }

    public function create(Request $request, int $projectId, DetailRequest $DR): Response
    {
        $data = $DR->create($request->getParsedBody());
        $details = DetalleDto::fromArray($data);
        $newTaskId = $this->task->create(new TaskDto($projectId), $details);

        return new JsonResponse($this->task->getOne(["T.id" => $newTaskId]));
    }

    public function update(Request $request, int $id, DetailRequest $DR): Response
    {
        $data = $DR->create($request->getParsedBody());
        $details = DetalleDto::fromArray($data);
        $this->task->update($id, $details);

        return new JsonResponse($this->task->getOne(["T.id" => $id]));
    }

    public function delete(int $id): Response
    {
        return new JsonResponse($this->task->remove($id));
    }
}