<?php
declare(strict_types=1);

use Slim\App;
use Slim\Routing\RouteCollectorProxy as Group;

/**
 * Mapea TODAS las rutas `web` de la aplicacion
*/
return function(App $app) {
    $app->group("", function(Group $app) {
        $app->get("/", "");
    });
};
