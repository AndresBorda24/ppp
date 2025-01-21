import Auth from './routes/Auth.tsx';
import { AuthMiddleware } from './middleware/AuthMiddleware.tsx';
import { CreateProjectView } from './routes/create-project/CreateProjectView.tsx';
import { ErrorPage } from "./routes/Error";
import { GuestMiddleware } from './middleware/GuestMiddleware.tsx';
import { IndexPage } from "./routes/index/IndexPage";
import { LoginPage } from './routes/login/LoginPage.tsx';
import { ProjectView } from "./routes/project/ProjectView.tsx";
import Root from "./routes/root";
import { createBrowserRouter } from "react-router-dom";
import { createProejctAction } from './routes/create-project/CreateProjectAction.ts';
import { indexLoader } from "./routes/index/indexLoader";
import { loginAction } from './routes/login/loginAction.ts';
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
                action: createProejctAction,
                element: <CreateProjectView />
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
            element: <LoginPage />,
            action: loginAction
          }
        ]
      },
    ]
  }
]);
