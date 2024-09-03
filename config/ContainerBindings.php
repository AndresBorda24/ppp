<?php
declare(strict_types=1);

use Medoo\Medoo;
use Psr\Container\ContainerInterface;
use Slim\Views\PhpRenderer;

return [
    PhpRenderer::class => fn() => new PhpRenderer(
        __DIR__ . "/..$_ENV[TEMPLATES]"
    ),

    Medoo::class => fn(ContainerInterface $c) => new Medoo([
        'type' => $c->get('db')['type'],
        'host' => $c->get('db')['host'],
        'database' => $c->get('db')['database'],
        'username' => $c->get('db')['username'],
        'password' => $c->get('db')['password'],
    ])
];
