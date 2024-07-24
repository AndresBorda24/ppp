<?php

declare(strict_types=1);


namespace App\Http\Controllers\Api;

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

    // public function findOne(int $id): Response
    // {
    //     return new JsonResponse($this->task->fin);
    // }
}