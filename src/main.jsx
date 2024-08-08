import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@fontsource/ubuntu/300.css';
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';
import './index.css'
import { ProjectFullList } from './routes/ProjectFullList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <ProjectFullList />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
