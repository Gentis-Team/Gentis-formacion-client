import { authApi } from './authApi';


export const getAllCentersFn = async () => {
    const response = await authApi.get(`/api/centers`);
    return response.data;
};

export const getCenterFn = async (id) => {
    const response = await authApi.get(`/api/centers/${id}`);
    return response.data;
};

export const createCenterFn = async (formData) => {
    const response = await authApi.post(`/api/centers`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateCenterFn = async ({
    id,
    formData,
}) => {
    const response = await authApi.put(`/api/centers/${id}`, formData, {
        //headers: {'Content-Type': 'multipart/form-data',},
    });
    
    return response.data;
};

export const deleteCenterFn = async (id) => {
    const response = await authApi.delete(`/api/centers/${id}`);
    return response.data;
};