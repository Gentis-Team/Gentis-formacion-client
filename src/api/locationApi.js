import { authApi } from './authApi';


export const getAllLocationsFn = async () => {
    const response = await authApi.get(`/api/locations`);
    return response.data;
};

export const getLocationFn = async (id) => {
    const response = await authApi.get(`/api/locations/${id}`);
    return response.data;
};

export const createLocationFn = async (formData) => {
    const response = await authApi.post(`/api/locations`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateLocationFn = async ({
    id,
    formData,
}) => {
    const response = await authApi.put(`/api/locations/${id}`, formData, {
        //headers: {'Content-Type': 'multipart/form-data',},
    });
    
    return response.data;
};

export const deleteLocationFn = async (id) => {
    const response = await authApi.delete(`/api/locations/${id}`);
    return response.data;
};