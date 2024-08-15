<?php
declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Requests\DetailRequest;
use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Laminas\Diactoros\Response\JsonResponse;

class ProjectController
{
    public function __construct(
        public readonly Project $project
    ) {}

    public function index(Request $request): Response
    {
        @[
            "page"   => $page,
            "amount" => $amount,
            "status" => $status,
            "order"  => [ $field, $order ],
            "title"  => $title
        ] = $request->getQueryParams() + [
            // Valores por defecto -- ;°)
            "page"   => 1,
            "amount" => 10,
            "status" => "",
            "order"  => [ "d.id", "desc" ],
            "title"  => ""
        ];

        return new JsonResponse($this->project->pagination(
            title: $title,
            page: (int) $page,
            amount: (int) $amount,
            status: $status,
            field: $field,
            order: $order
        ));
    }

    public function search(Request $request): Response
    {
        $search = @$request->getQueryParams()["search"];
        $data = ($search === null)
            ? []
            : $this->project->searchBox($search);

        return new JsonResponse($data);
    }

    public function basic(string|int $id): Response
    {
        return new JsonResponse($this->project->getBasic($id));
    }

    public function store(Request $request, DetailRequest $DR): Response
    {
        try {
            $body = $request->getParsedBody();
            $detail = $DR->create($body);
        } catch(\App\Http\Requests\FormValidationException $e) {
            return new JsonResponse([
                "message" => $e->getMessage(),
                "fields"  => $e->getInvalidFields()
            ]);
        }

        $detalleDTO = new \App\Dto\DetalleDto(
            title         : $detail["title"],
            description   : $detail["description"],
            status        : $detail["status"],
            delegate_id   : $detail["delegate_id"],
            created_by_id : $detail["created_by_id"],
            priority      : $detail["priority"],
            created_at    : $detail["created_at"],
            started_at    : $detail["started_at"],
            updated_at    : $detail["updated_at"],
            finished_at   : $detail["finished_at"],
        );

        $projectDTO = new \App\Dto\ProjectDto(
            estimated_time: 'weeks', // Cambiar esto
            slug: $this->project->generateSlug($detalleDTO->title),
            due_date: null
        );

        return new JsonResponse($this->project->getBasic(
            $this->project->create($projectDTO, $detalleDTO)
        ));
    }

    public function update(
        Request $request,
        int $id,
        DetailRequest $DR,
        ProjectRequest $PR
    ): Response {
        try {
            $body = $request->getParsedBody();
            $project = $PR->update($body);
            $detail  = $DR->create($body);
        } catch(\App\Http\Requests\FormValidationException $e) {
            return new JsonResponse([
                "message" => $e->getMessage(),
                "fields"  => $e->getInvalidFields()
            ]);
        }

        $detalleDTO = new \App\Dto\DetalleDto(
            title         : $detail["title"],
            description   : $detail["description"],
            status        : $detail["status"],
            delegate_id   : $detail["delegate_id"],
            created_by_id : $detail["created_by_id"],
            priority      : $detail["priority"],
            created_at    : $detail["created_at"],
            started_at    : $detail["started_at"],
            updated_at    : $detail["updated_at"],
            finished_at   : $detail["finished_at"],
        );

        $projectDTO = new \App\Dto\ProjectDto(
            slug: $this->project->generateSlug($detalleDTO->title),
            due_date: $project["due_date"],
            estimated_time: $project["estimated_time"]
        );

        $this->project->update($id, $projectDTO, $detalleDTO);

        return new JsonResponse($this->project->getBasic($id));
    }

    public function remove(int $id): Response
    {
        return new JsonResponse($this->project->remove($id));
    }

    public function find(string $slug): Response
    {
        return new JsonResponse($this->project->findBySlug($slug));
    }
}
