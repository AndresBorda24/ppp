<?php

declare(strict_types=1);

namespace App\Enums;

enum DetailType: string
{
    case PROJECT = "project";
    case TASK = "task";
    case SUBTASK = "sub_task";
}
