import { authApi } from './authApi';


export const getAllStudentsFn = async () => {
    const response = await authApi.get(`/api/students`);
    return response.data;
};

export const getStudentFn = async (id) => {
    const response = await authApi.get(`/api/students/${id}`);
    return response.data;
};

export const createStudentFn = async (formData) => {
    const response = await authApi.post(`/api/students`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateStudentFn = async ({
    id,
    formData,
}) => {
    const response = await authApi.put(`/api/students/${id}`, formData, {
        //headers: {'Content-Type': 'multipart/form-data',},
    });
    
    return response.data;
};

export const deleteStudentFn = async (id) => {
    const response = await authApi.delete(`/api/students/${id}`);
    return response.data;
};