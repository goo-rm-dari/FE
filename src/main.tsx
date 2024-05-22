import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'

const root = document.getElementById('root')!

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
)
