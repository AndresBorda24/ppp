import { ActionFunctionArgs } from 'react-router-dom'

export async function createProejctAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  console.log({ data: Object.fromEntries(formData) })
  return null
}
