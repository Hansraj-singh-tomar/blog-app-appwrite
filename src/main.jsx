import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Login from "./pages/Login.jsx"
import AllPost from "./pages/AllPost.jsx"
import Post from "./pages/Post.jsx"
import AddPost from './pages/AddPost.jsx'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/all-posts",
        element: <AllPost />
      },
      {
        path: "/add-post",
        element: <AddPost />
      },
      // {
      //   path: "/edit-post/:slug",
      //   element: <EditPost />
      // },
      {
        path: "/post",
        element: <Post />
      },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
