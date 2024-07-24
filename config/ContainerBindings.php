<?php
declare(strict_types=1);

use Medoo\Medoo;
use Slim\Views\PhpRenderer;

return [
    PhpRenderer::class => fn() => new PhpRenderer(
        __DIR__ . "/..$_ENV[TEMPLATES]"
    ),

    Medoo::class => fn() => new Medoo([
        'type' => $_ENV["DB_TYPE"],
        'host' => $_ENV["DB_HOST"],
        'database' => $_ENV["DB_NAME"],
        'username' => $_ENV["DB_USER"],
        'password' => $_ENV["DB_PASS"],
    ])
];
