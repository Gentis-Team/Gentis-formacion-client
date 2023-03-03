import { Suspense, lazy } from 'react';
import FullScreenLoader from '@/components/layout/loaders/FullScreenLoader';
import Layout from '@/components/layout/Layout';
import RequireUser from '@/guards/RequireUser';
import HomePage from '@/views/home/Home';
import LoginPage from '@/views/login/Login';
import ProfilePage from '@/views/profile/Profile';
import NewCoursePage from '../views/admin/NewCoursePage';

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

/* A route that is not protected by the `RequireUser` guard. */
const authRoutes = {
    path: '*',
    children: [
        {
            path: 'login',
            element: <LoginPage />,
        },
        {
            path: 'register',
            element: <RegisterPage />,
        },
        {
            path: 'create',
            element: <NewCoursePage />,
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
            path: 'profile',
            element: <RequireUser allowedRoles={['user', 'admin']} />,
            children: [
                {
                    path: '',
                    element: <ProfilePage />,
                },
            ],
        },
        {
            path: 'unauthorized',
            element: <UnauthorizePage />,
        },
    ],
};

const routes = [authRoutes, normalRoutes];

export default routes;
