<?php

declare(strict_types=1);

use App\Http\Controllers\Api\TaskController;
use Slim\App;
use Slim\Routing\RouteCollectorProxy as Group;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SubtaskController;
use App\Http\Middleware\ApiErrorMiddleware;
use App\Http\Middleware\CorsMiddleware;
use App\Http\Middleware\JsonBodyParserMiddleware;

/** Rutas Api */
return function (App $app) {
    $app->group("/api", function (Group $api) {
        // --------------< Proyectos >--------------
        $api->group("/projects", function(Group $pj) {
            $pj->get("", [ProjectController::class, "index"]);
            $pj->get("/search", [ProjectController::class, "search"]);
            $pj->get("/{id:[0-9]+}/basic", [ProjectController::class, "basic"]);
            $pj->get("/{slug}/find", [ProjectController::class, "find"]);
            $pj->get("/{projectId:[0-9]+}/tasks", [TaskController::class, "getAllForProject"]);
            $pj->get("/{projectId:[0-9]+}/tasks-basic", [TaskController::class, "getAllForProjectBasic"]);
            $pj->post("/store", [ProjectController::class, "store"]);
            $pj->patch("/{id:[0-9]+}/patch", [ProjectController::class, "patch"]);
            $pj->put("/{id:[0-9]+}/update", [ProjectController::class, "update"]);
            $pj->delete("/{id:[0-9]+}/delete", [ProjectController::class, "remove"]);
        });

        $api->group("/tasks", function(Group $tk) {
            $tk->get("/{id:[0-9]+}/get", [TaskController::class, "findOne"]);
            $tk->get("/{taskId:[0-9]+}/subtasks", [SubtaskController::class, "getAllForTask"]);
            $tk->post("/{projectId:[0-9]+}/create", [TaskController::class, "create"]);
            $tk->put("/{id:[0-9]+}/update", [TaskController::class, "update"]);
            $tk->patch("/{id:[0-9]+}/patch", [TaskController::class, "patch"]);
            $tk->delete("/{id:[0-9]+}/delete", [TaskController::class, "delete"]);
        });

        $api->group("/subtasks", function(Group $st) {
            $st->get("/{id:[0-9]+}/get", [SubtaskController::class, "findOne"]);
            $st->post("/{taskId:[0-9]+}/create", [SubtaskController::class, "create"]);
            $st->post("/{id:[0-9]+}/to-task", [SubtaskController::class, "toTask"]);
            $st->put("/{id:[0-9]+}/update", [SubtaskController::class, "update"]);
            $st->patch("/{id:[0-9]+}/patch", [SubtaskController::class, "patch"]);
            $st->delete("/{id:[0-9]+}/delete", [SubtaskController::class, "delete"]);
        });

        $api->options("/{routes:.+}", fn ($response) => $response);

        // $api->get('/attachment/(\d+)/download', 'Api\AdjuntosController@download');
        // $api->get('/project/(\d+)/attachments', 'Api\AdjuntosController@getAttachments');
        // $api->get('/project/(\d+)/attachments/delete', 'Api\AdjuntosController@test');
        // $api->post('/project/(\d+)/attachments', 'Api\AdjuntosController@upload');
        // $api->delete('/attachment/(\d+)', 'Api\AdjuntosController@remove');

        // // Gema Scopes
        // $api->get('/gema-scopes', 'Api\GemaScopeController@index');
        // $api->post('/gema-scope', 'Api\GemaScopeController@save');
        // $api->put('/gema-scope/(\d+)/change-visibility', 'Api\GemaScopeController@changeScopeVisivility');
        // $api->delete('/gema-scope/(\d+)/replacement/(\d+)', 'Api\GemaScopeController@remove');

        // //  Rutas para los status
        // $api->get('/status', 'Api\StatusController@index');
        // $api->post('/add-status', 'Api\StatusController@save');
        // $api->put('/status/(\d+)', 'Api\StatusController@update');
        // $api->delete('/status/(\d+)/replacement/(\d+)', 'Api\StatusController@remove');

        // // --------------< Observaciones >--------------
        // $api->get('/project/(\d+)/observations', 'Api\ObservationController@loadProjectObs');
        // $api->post('/project/(\d+)/observations', 'Api\ObservationController@addProjectObs');

        // $api->get('/task/(\d+)/observations', 'Api\ObservationController@loadTaskObs');
        // $api->post('/task/(\d+)/observations', 'Api\ObservationController@addTaskObs');

        // $api->get('/sub-task/(\d+)/observations', 'Api\ObservationController@loadSubTaskObs');
        // $api->post('/sub-task/(\d+)/observations', 'Api\ObservationController@addSubTaskObs');

        // $api->get('/request/(\d+)/observations', 'Api\ObservationController@loadRequestObs');
        // $api->post('/request/(\d+)/observations', 'Api\ObservationController@addRequestObs');

        // $api->delete('/observation/(\d+)', 'Api\ObservationController@remove');

        // // Reportes
        // $api->get('/reports/projects', 'Api\ReportsController@projects');
        // $api->get('/reports/projects-with-tasks', 'Api\ReportsController@projectWithTasks');

        // // --------------< Solicitudes >--------------
        // $api->get('/requests', 'Api\RequestController@index');
        // $api->get('/requests/test', 'Api\RequestController@test');
        // $api->get('/request/(\d+)', 'Api\RequestController@getRequest');
        // $api->get('/search-requests', 'Api\RequestController@searchBox');

        // $api->post('/request', 'Api\RequestController@store');

        // $api->put('/request/(\d+)', 'Api\RequestController@update');
        // $api->put('/request/(\d+)/set-pin', 'Api\RequestController@updatePinnedValue');
        // $api->put('/request/(\d+)/set-project', 'Api\RequestController@updateProjectId');

        // $api->delete('/request/(\d+)', 'Api\RequestController@remove');

        // // --------------< Sub-tareas >--------------
        // $api->get('/task/(\d+)/sub-tasks', 'Api\SubTaskController@getSubTasks');
        // $api->get('/sub-task/(\d+)', 'Api\SubTaskController@subTask');
        // $api->get('/sub-task/(\d+)/to-task', 'Api\SubTaskController@subTaskToTask');

        // $api->post('/task/(\d+)/sub-tasks', 'Api\SubTaskController@store');
        // $api->put('/sub-task/(\d+)', 'Api\SubTaskController@update');
        // $api->delete('/sub-task/(\d+)', 'Api\SubTaskController@remove');

        // // --------------< Tareas >--------------
        // $api->get('/project/(\d+)/tasks', 'Api\TaskController@getTasks');
        // $api->get('/task/(\d+)', 'Api\TaskController@task');

        // $api->post('/project/(\d+)/tasks', 'Api\TaskController@store');
        // $api->put('/task/(\d+)', 'Api\TaskController@update');
        // $api->delete('/task/(\d+)', 'Api\TaskController@remove');

        // // --------------< Usuarios >--------------
        // $api->get('/get-users', 'Api\UsersController@getUsers');

        // // --------------< Log >--------------
        // $api->get('/get-obs-log', 'Api\ViewActivitiesController@getLog');
    })
        ->add(ApiErrorMiddleware::class)
        ->add(JsonBodyParserMiddleware::class)
        ->add(CorsMiddleware::class)
    ;
};
