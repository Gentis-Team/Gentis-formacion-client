import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ColorModeProvider } from '@/services/providers/ColorModeProvider'
import { StateContextProvider } from '@/services/providers/StateContextProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthMiddleware from '@/middlewares/AuthMiddleware';
import { CoursesContextProvider } from '@/services/providers/CoursesContextProvider';
import { LocationsContextProvider } from '@/services/providers/LocationsContextProvider';
import { CategoriesContextProvider } from '@/services/providers/CategoriesContextProvider';
import { RequirementsContextProvider } from '@/services/providers/RequirementsContextProvider';
import { GroupsContextProvider } from '@/services/providers/GroupsContextProviders';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <StateContextProvider>
            <CoursesContextProvider>
              <LocationsContextProvider>
                <CategoriesContextProvider>
                  <RequirementsContextProvider>
                    <GroupsContextProvider>
                      <AuthMiddleware>
                        <App />
                      </AuthMiddleware>
                    </GroupsContextProvider>
                  </RequirementsContextProvider>
                </CategoriesContextProvider>
              </LocationsContextProvider>
            </CoursesContextProvider>
          </StateContextProvider>
          <ReactQueryDevtools initialisopen="{false}" />
        </Router>
      </QueryClientProvider>
    </ColorModeProvider>
  </React.StrictMode>,
)
