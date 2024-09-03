import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' // Importing global CSS styles
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Importing react-query for data fetching
import { RouterProvider } from 'react-router-dom' // Importing react-router for route management
import routes from './router/routes' // Importing the app's route configuration

// Create a new QueryClient instance to manage cache and state for react-query
const queryClient = new QueryClient()

// The entry point of the React application, rendering the app into the DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
  // StrictMode is a tool for highlighting potential problems in an application
  <React.StrictMode>
    {/* Provide the QueryClient to the entire app for managing server state */}
    <QueryClientProvider client={queryClient}>
      {/* RouterProvider sets up the routing system using the defined routes */}
      <RouterProvider router={routes}/>
    </QueryClientProvider>
  </React.StrictMode>,
)
