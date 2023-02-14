import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import { getMeFn } from '@/api/authApi';
import { useStateContext } from '@/services/providers/StateContextProvider';
import FullScreenLoader from '@/components/layout/loaders/FullScreenLoader';
import React from 'react';

const AuthMiddleware = ({ children }) => {
    const [cookies] = useCookies(['logged_in']);
    const stateContext = useStateContext();

    const query = useQuery(['authUser'], () => getMeFn(), {
        select: (data) => data.user,
        onSuccess: (data) => {
            stateContext.dispatch({ type: 'SET_USER', payload: data });
        },
    });

    if (query.isLoading && cookies.logged_in) {
        return <FullScreenLoader />;
    }

    return children;
};

export default AuthMiddleware;
