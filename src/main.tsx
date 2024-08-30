import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root'
import { ErrorPage } from './routes/Error.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProjectFullList, loader as ProjectListLoader } from './routes/ProjectFullList.tsx'
import CreateProject, { action as createAction } from './routes/CreateProject.tsx'
import ProjectView, { loader as ProjectLoader } from './routes/Project.tsx'

import '@fontsource/ubuntu/300.css';
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
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
          },
          {
            path: '/p/:slug/ver',
            loader: ProjectLoader,
            element: <ProjectView />
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
