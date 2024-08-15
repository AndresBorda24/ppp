import { ActionFunctionArgs, useLoaderData } from "react-router-dom"
import View from "../components/view"
import { appFetch } from "../AppFetch"
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

  const { title } = data

  return (
    <View title={`Visualizando: ${title}`}>

    </View>
  )
}

export default ProjectView
