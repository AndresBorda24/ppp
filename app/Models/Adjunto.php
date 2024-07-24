<?php
declare(strict_types=1);

namespace App\Models;

use Medoo\Medoo;
use App\Dto\AdjuntoDto;

class Adjunto
{
    public const TABLE = 'pp_project_files';
    public const FOLDER = '/adjuntos';

    public function __construct(
        public readonly Medoo $db
    ) {}

    /**
     * Retorna todos ls adjuntos relacionados a un proyecto.
    */
    public function findAttachments(int|string $projectId): array
    {
        try {
            return $this->db->select(self::TABLE, [
                'project_id', 'path', 'name'
            ], [
                "AND" => [
                    "type" => "adjunto",
                    "project_id" => $projectId
                ]
            ]);
        } catch(\Exception $e) {
            throw $e;
        }
    }

    /**
     * Almacenas los adjuntos en la base de datos. Aquí se supone que el
     * tipo debe ser 'adjunto';
     */
    public function saveAttachments(AdjuntoDto $data)
    {
        try {
            $this->db->insert(self::TABLE, [
                'project_id' => $data->project_id,
                'path' => $data->path,
                'name' => $data->name,
                'type' => $data->type
            ]);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function removeFile(int $id): bool
    {
        try {
            $path   = $this->db->get(self::TABLE, "path", ["id" => $id]);
            $delete = $this->db->delete(self::TABLE, ["id" => $id]);

            if ($delete === null) return false;
            if ($path === null) return true;
            if(! file_exists(PROJECT_ROOT . $path)) return true;

            return unlink(PROJECT_ROOT . $path);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * Elimina la carpeta y los archivos relacionados a un proyecto
     * despues de que este es eliminado. Debe llamarse a la funcion.
     * Por eso aparece en el controlador.
     */
    public static function removeDir(int $projectId)
    {
        $folder = PROJECT_ROOT . "/storage" . self::FOLDER . "/project_{$projectId}";
        if (!file_exists($folder)) return;

        $files = glob($folder . "/*"); // get all file names
        foreach ($files as $file) {
            if (is_file($file)) unlink($file); // delete file
        }

        rmdir($folder);
        return;
    }

    /**
     * Genera el "path" para guardar un adjunto en la base de datos
     * @param string $name Nombre del archivo subido.
    */
    public static function generatePath(int $projectId, string $name): string
    {
        return PROJECT_ROOT
            . "/storage"
            . self::FOLDER
            . "/project_$projectId"
            . "/$name";
    }
}
