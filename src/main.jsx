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
import { FiltersContextProvider } from './services/providers/FiltersContextProvider';
import { FilteredCoursesContextProvider } from './services/providers/FilteredCoursesProvider';
import { CentersContextProvider } from './services/providers/CentersContextProvider';

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
    <FiltersContextProvider>

      <QueryClientProvider client={queryClient}>
        <Router>
          <StateContextProvider>
              <CentersContextProvider>
              <CoursesContextProvider>
                <FilteredCoursesContextProvider>
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
                </FilteredCoursesContextProvider>
              </CoursesContextProvider>
              </CentersContextProvider>
          </StateContextProvider>
          <ReactQueryDevtools initialisopen="{false}" />
        </Router>
      </QueryClientProvider>
      </FiltersContextProvider>
    </ColorModeProvider>
  </React.StrictMode>,
)
