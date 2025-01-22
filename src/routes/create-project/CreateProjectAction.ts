import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { BareBasicProject, Priority } from '../../types';

import { createProject } from '../../requests/project-request';

export async function createProejctAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const project: BareBasicProject = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    priority: formData.get('priority') as Priority
  }

  const { data, error } = await createProject(project);
  if (error) return error;
  if (data) return redirect(`/p/${data.slug}/ver`);

  return null;
}
