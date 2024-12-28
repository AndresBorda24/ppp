import { toast } from "sonner";
import { findCommentsByProjectId, findProjectBySlug, findTasksByProjectId } from "../../requests/project-request";
import { useProjectStore } from "../../stores/Project";
import { ActionFunctionArgs } from "react-router-dom";

export const projectLoader = async function loader({ params }: ActionFunctionArgs) {
    const { data, error } = await findProjectBySlug(params.slug as string);

    if (error) throw error;
    if (data === null) throw new Error("Project Not Found.");

    const store = useProjectStore.getState();
    store.rewriteProject(data);

    findTasksByProjectId(data.id).then(({ data, error }) => {
      store.pushTaks(data ?? []);
      error && toast.error("Imposible cargar listado de tareas");
    });

    findCommentsByProjectId(data.id).then(({ data, error }) => {
      store.pushComments(data ?? []);
      error && toast.error("Imposible cargar listado de Comentarios");
    });

    return null;
}
