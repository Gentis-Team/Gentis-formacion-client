import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getMeFn } from '@/api/authApi';
import { useStateContext } from '@/services/providers/StateContextProvider';
import FullScreenLoader from '@/components/layout/loaders/FullScreenLoader';

const RequireGuest = () => {
    const [cookies] = useCookies(['logged_in']);
    const location = useLocation();
    const stateContext = useStateContext();

    const {
        isLoading,
        isFetching,
        data: user,
    } = useQuery(['authUser'], getMeFn, {
        retry: 1,
        select: (data) => data.user,
        onSuccess: (data) => {
            stateContext.dispatch({ type: 'SET_USER', payload: data });
        },
    });

    const loading = isLoading || isFetching;
    if (loading) {
        return <FullScreenLoader />;
    }

    return (cookies.logged_in || user) ? (
        <Navigate to='/' state={{ from: location }} replace />
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    );
};

export default RequireGuest;
