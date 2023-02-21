import { authApi } from './authApi';


export const getAllCategoriesFn = async () => {
    const response = await authApi.get(`/api/categories`);
    return response.data;
};

export const getCategoryFn = async (id) => {
    const response = await authApi.get(`/api/categories/${id}`);
    return response.data;
};

export const createCategoryFn = async (formData) => {
    const response = await authApi.post(`/api/categories`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateCategoryFn = async ({
    id,
    formData,
}) => {
    const response = await authApi.put(`/api/categories/${id}`, formData, {
        //headers: {'Content-Type': 'multipart/form-data',},
    });
    
    return response.data;
};

export const deleteCategoryFn = async (id) => {
    const response = await authApi.delete(`/api/categories/${id}`);
    return response.data;
};