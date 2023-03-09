import { Suspense, lazy } from 'react';
import FullScreenLoader from '@/components/layout/loaders/FullScreenLoader';
import Layout from '@/components/layout/Layout';
import RequireUser from '@/guards/RequireUser';
import RequireGuest from '@/guards/RequireGuest';
import HomePage from '@/views/home/Home';
import LoginPage from '@/views/login/Login';
import SingleCourse from '@/views/course/SingleCourse';
import NewCoursePage from '@/views/admin/NewCoursePage';
import NewStudentPage from '../views/guest/NewStudentPage';

const Loadable =
    (Component) => (props) =>
    (
        <Suspense fallback={<FullScreenLoader />}>
            <Component {...props} />
        </Suspense>
    );

const RegisterPage = Loadable(lazy(() => import('@/views/register/Register')));
const UnauthorizePage = Loadable(
    lazy(() => import('@/views/errors/UnauthorizedPage'))
);
const PageNotFound = Loadable(
    lazy(() => import('@/views/errors/PageNotFound'))
);

/* A route that is not protected by the `RequireUser` guard. */
const authRoutes = {
    path: '*',
    element: <Layout />,
    children: [
        
                {
                    path: 'login',
                    element: <LoginPage />,
                },
        {
            path: 'create',
            element: <RequireUser allowedRoles={['user', 'admin']} />,
            children: [
                {
                    path: '',
                    element: <NewCoursePage />,
                },
            ],
        },
        {
            path: 'register',
            element: <RequireUser allowedRoles={['admin']} />,
            children: [
                {
                    path: '',
                    element: <RegisterPage />,
                },
            ],
        },
    ],
};

/* A route that is protected by the `RequireUser` guard. */
const normalRoutes = {
    path: '*',
    element: <Layout />,
    children: [
        {
            index: true,
            element: <HomePage />,
        },
        {
            path: 'new-student',
            element: <NewStudentPage />,
        },
        {
            path: 'single-course/:id',
            element: <SingleCourse />,
        },
        {
            path: 'unauthorized',
            element: <UnauthorizePage />,
        },
        {
            path: '*',
            element: <PageNotFound />,
        },
    ],
};

const routes = [authRoutes, normalRoutes];

export default routes;
