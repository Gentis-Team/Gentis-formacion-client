import { authApi } from './authApi';


export const getAllGroupsFn = async () => {
    const response = await authApi.get(`/api/groups`);
    return response.data;
};

export const getGroupFn = async (id) => {
    const response = await authApi.get(`/api/groups/${id}`);
    return response.data;
};

export const createGroupFn = async (formData) => {
    const response = await authApi.post(`/api/groups`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateGroupFn = async ({
    id,
    formData,
}) => {
    const response = await authApi.put(`/api/groups/${id}`, formData, {
        //headers: {'Content-Type': 'multipart/form-data',},
    });
    
    return response.data;
};

export const deleteGroupFn = async (id) => {
    const response = await authApi.delete(`/api/groups/${id}`);
    return response.data;
};