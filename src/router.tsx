import CreateProject, { action as createAction } from './routes/CreateProject.tsx'

import Auth from './routes/Auth.tsx';
import { AuthMiddleware } from './middleware/AuthMiddleware.tsx';
import { ErrorPage } from "./routes/Error";
import { GuestMiddleware } from './middleware/GuestMiddleware.tsx';
import { IndexPage } from "./routes/index/IndexPage";
import { ProjectView } from "./routes/project/ProjectView.tsx";
import Root from "./routes/root";
import { createBrowserRouter } from "react-router-dom";
import { indexLoader } from "./routes/index/indexLoader";
import { projectLoader } from "./routes/project/projectLoader.ts";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthMiddleware />,
        errorElement: <ErrorPage />,
        children: [
          {
            element: <Auth />,
            children: [
              {
                index: true,
                loader: indexLoader,
                element: <IndexPage />,
              },
              {
                path: '/new-project',
                action: createAction,
                element: <CreateProject />
              },
              {
                path: '/p/:slug/ver',
                loader: projectLoader,
                element: <ProjectView />
              },
            ]
          }
        ]
      },
      {
        element: <GuestMiddleware />,
        children: [
          {
            path: '/login',
            element: (<div>Login</div>)
          }
        ]
      },
    ]
  }
]);
