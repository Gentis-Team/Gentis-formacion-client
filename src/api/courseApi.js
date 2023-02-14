import { authApi } from './authApi';


export const getAllCoursesFn = async () => {
    const response = await authApi.get(`/api/courses`);
    return response.data;
};

export const getCourseFn = async (id) => {
    const response = await authApi.get(`/api/courses/${id}`);
    return response.data;
};

export const createCourseFn = async (formData) => {
    const response = await authApi.post(`/api/courses`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateCourseFn = async ({
    id,
    formData,
}) => {
    const response = await authApi.put(`/api/courses/${id}`, formData, {
        //headers: {'Content-Type': 'multipart/form-data',},
    });
    
    return response.data;
};

export const deleteCourseFn = async (id) => {
    const response = await authApi.delete(`/api/courses/${id}`);
    return response.data;
};