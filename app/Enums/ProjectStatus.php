<?php

declare(strict_types=1);

namespace App\Enums;

enum ProjectStatus: string
{
    case NEW      = 'new';
    case PROCESS  = 'process';
    case PAUSED   = 'paused';
    case FINISHED = 'finished';
}
