import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProjectFullList, loader as ProjectListLoader } from './routes/ProjectFullList.tsx'
import CreateProject, { action as createAction } from './routes/CreateProject.tsx'

import '@fontsource/ubuntu/300.css';
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        loader: ProjectListLoader,
        element: <ProjectFullList />,
      },
      {
        path: '/new-project',
        action: createAction,
        element: <CreateProject />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)