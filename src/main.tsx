import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./scss/index.scss"
import Error from './routes/Error.tsx';
import StackControls from './routes/Stack.tsx';
import QueueControls from './routes/Queue.tsx';
import ListControls from './routes/LinkedList.tsx';
import Tree from './routes/Trees.tsx';
import Graphs from './routes/Graphs.tsx';
import HashTables from './routes/HashTables.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <StackControls/>,
      },
      {
        path: "/stacks",
        element: <StackControls/>,
      },
      {
        path: "/queues",
        element: <QueueControls/>,
      },
      {
        path: "/lists",
        element: <ListControls/>,
      },
      {
        path: "/trees",
        element: <Tree/>,
      },
      {
        path: "/graphs",
        element: <Graphs/>,
      },
      {
        path: "/hashtables",
        element: <HashTables/>,
      },
    ],

  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
