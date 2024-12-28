<?php

declare(strict_types=1);

use DI\ContainerBuilder;

$containerBuilder = (new ContainerBuilder())
    ->addDefinitions(__DIR__.'/config.php')
    ->addDefinitions(__DIR__.'/ContainerBindings.php')
;

return $containerBuilder->build();
