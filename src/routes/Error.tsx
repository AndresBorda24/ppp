import { useRouteError } from "react-router-dom"

export const ErrorPage: React.FC = () => {
  const error = useRouteError()

  return (
    <div className="h-screen flex flex-1">
      <div className="m-auto flex flex-col justify-center gap-2">
        <span className="font-bold text-3xl inline-block text-center">Vaya...</span>
        <span className="text-xl text-neutral-700">Ha ocurrido un error.</span>
        <span className="inline-block text-center text-neutral-500">
          {(error as Error).message || 'Poca información sobre el error...'}
        </span>
      </div>
    </div>
  )
}
