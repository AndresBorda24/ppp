import { ActionFunctionArgs, useLoaderData } from "react-router-dom"
import View from "../components/view"
import { appFetch } from "../AppFetch"
import { XInput, XTextarea } from "../components/forms"
import { Project as ProjectType } from "../types"
import { ProjectNotFound } from "../components/ProjectNotFound"

interface LoaderDataType {
  data: ProjectType|null
  error: unknown
}

export async function loader({ params }: ActionFunctionArgs) {
  const {data, error} = await appFetch<ProjectType>('GET', {
    url: `/projects/${params.slug}/find`
  })

  return { data, error }
}

const ProjectView: React.FC = () => {
  const { data, error } = useLoaderData() as LoaderDataType
  if (data === null) return <ProjectNotFound />

  const { title, description } = data

  return (
    <View title={`Visualizando: ${title}`}>
      <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">Título:</span>
      <XInput type="text" name="title" defaultValue={title}>
        Esto solo aparecerá cuando no se muestre el input de modificación...
      </XInput>

      <span className="text-neutral-400 font-bold text-[10px] inline-block pl-1">Descripción:</span>
      <XTextarea name="desciption" defaultValue={description} rows={10}>
        <p className="text-neutral-700">{description}</p>
      </XTextarea>
    </View>
  )
}

export default ProjectView
