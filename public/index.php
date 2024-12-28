<?php
declare(strict_types=1);

require __DIR__ . "/../config/constants.php";
require PROJECT_ROOT . "/vendor/autoload.php";

/** Fecha - Hora | Colombia */
date_default_timezone_set('America/Bogota');

/**
 * Carga las rutas web
 * @var Callable
 * @return void
*/
$web = require PROJECT_ROOT . "/routes/web.php";

/**
 * Carga los endpionts de la API
 * @var Callable
 * @return void
*/
$api = require PROJECT_ROOT . "/routes/api.php";

// Se carga la configuracion del .env
$dotenv = Dotenv\Dotenv::createImmutable(PROJECT_ROOT);
$dotenv->load();

/* -----------------------------------------------------------------------------
| Se configura el contenedor.
+ ------------------------------------------------------------------------------
*/
$app = \DI\Bridge\Slim\Bridge::create(require PROJECT_ROOT . "/config/configContainer.php");

/* -----------------------------------------------------------------------------
| Cargamos las rutas
+ ------------------------------------------------------------------------------
*/
$app->setBasePath($_ENV["APP_BASE"]);
// $app->add(StartSessionsMiddleware::class);
$web($app);
$api($app);

/* -----------------------------------------------------------------------------
|  Errores
+ ------------------------------------------------------------------------------
*/
($_ENV["APP_ENV"] === "prod")
    ? $app->addErrorMiddleware(false, false, false)
    : $app->addErrorMiddleware(true, false, true);

$app->run();
