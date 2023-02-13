import { authApi } from './authApi';

const SERVER_ENDPOINT = import.meta.env.VITE_REACT_APP_SERVER_ENDPOINT;

export const getAllCoursesFn = async () => {
    const response = await authApi.get(`${SERVER_ENDPOINT}/api/courses`);
    return response.data;
};

export const getCourseFn = async (id) => {
    const response = await authApi.get(`${SERVER_ENDPOINT}/api/courses/${id}`);
    return response.data;
};

export const createCourseFn = async (formData) => {
    const response = await authApi.post(`${SERVER_ENDPOINT}/api/courses`, formData, {
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
    const response = await authApi.put(`${SERVER_ENDPOINT}/api/courses/${id}`, formData, {
        //headers: {'Content-Type': 'multipart/form-data',},
    });
    
    return response.data;
};

export const deleteCourseFn = async (id) => {
    const response = await authApi.delete(`${SERVER_ENDPOINT}/api/courses/${id}`);
    return response.data;
};