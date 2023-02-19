import { authApi } from './authApi';


export const getAllRequirementsFn = async () => {
    const response = await authApi.get(`/api/requirements`);
    return response.data;
};

export const getRequirementFn = async (id) => {
    const response = await authApi.get(`/api/requirements/${id}`);
    return response.data;
};

export const createRequirementFn = async (formData) => {
    const response = await authApi.post(`/api/requirements`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateRequirementFn = async ({
    id,
    formData,
}) => {
    const response = await authApi.put(`/api/requirements/${id}`, formData, {
        //headers: {'Content-Type': 'multipart/form-data',},
    });
    
    return response.data;
};

export const deleteRequirementFn = async (id) => {
    const response = await authApi.delete(`/api/requirements/${id}`);
    return response.data;
};