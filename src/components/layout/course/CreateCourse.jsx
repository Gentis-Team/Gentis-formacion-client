import {
    Box,
    CircularProgress,
    FormHelperText,
    TextareaAutosize,
    TextField,
    Typography,
} from '@mui/material';
import {
    Controller,
    FormProvider,
    useForm,
} from 'react-hook-form';
import { object, string, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCourseFn } from '@/api/courseApi';
import FileUploader from '@/components/layout/utils/FileUploader';

const createCourseSchema = object({
    title: string().min(1, 'Title is required'),
    content: string().max(50).min(1, 'Content is required'),
    category: string().max(50).min(1, 'Category is required'),
    image: z.instanceof(File),
});

const CreateCourse = ({ setOpenCourseModal }) => {
    const queryClient = useQueryClient();
    const { isLoading, mutate: createCourse } = useMutation(
        (course) => createCourseFn(course),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['courses']);
                toast.success('Course created successfully');
                setOpenCourseModal(false);
            },
            onError: (error) => {
                setOpenCourseModal(false);
                if (Array.isArray(error.response.data.error)) {
                    error.data.error.forEach((el) =>
                        toast.error(el.message, {
                            position: 'top-right',
                        })
                    );
                } else {
                    toast.error(error.response.data.message, {
                        position: 'top-right',
                    });
                }
            },
        }
    );

    const methods = useForm({
        resolver: zodResolver(createCourseSchema),
    });

    const {
        formState: { errors, isSubmitSuccessful },
    } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            methods.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler = (values) => {
        const formData = new FormData();

        formData.append('image', values.image);
        formData.append('data', JSON.stringify(values));
        createCourse(formData);
    };

    return (
        <Box>
            <Box display='flex' justifyContent='space-between' sx={{ mb: 3 }}>
                <Typography variant='h5' component='h1'>
                    Create Course
                </Typography>
                {isLoading && <CircularProgress size='1rem' color='primary' />}
            </Box>
            <FormProvider {...methods}>
                <Box
                    component='form'
                    noValidate
                    autoComplete='off'
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                >
                    <TextField
                        label='Course Title'
                        fullWidth
                        sx={{ mb: '1rem' }}
                        {...methods.register('title')}
                    />
                    <FormHelperText error={!!errors['title']}>
                        {errors['title'] ? errors['title'].message : ''}
                    </FormHelperText>
                    <TextField
                        label='Category'
                        fullWidth
                        sx={{ mb: '1rem' }}
                        {...methods.register('category')}
                    />
                    <FormHelperText error={!!errors['category']}>
                        {errors['category'] ? errors['category'].message : ''}
                    </FormHelperText>

                    <Controller
                        name='content'
                        control={methods.control}
                        defaultValue=''
                        render={({ field }) => (
                            <>
                                <TextareaAutosize
                                    {...field}
                                    placeholder='Course Details'
                                    minRows={8}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #c8d0d4',
                                        fontFamily: 'Roboto, sans-serif',
                                        outline: 'none',
                                        fontSize: '1rem',
                                        padding: '1rem',
                                    }}
                                />
                                <FormHelperText error={!!errors[field.name]}>
                                    {errors[field.name] ? errors[field.name]?.message : ''}
                                </FormHelperText>
                            </>
                        )}
                    />
                    <FileUploader name='image' />
                    <LoadingButton
                        variant='contained'
                        fullWidth
                        sx={{ py: '0.8rem', mt: 4, backgroundColor: '#2363eb' }}
                        type='submit'
                        loading={isLoading}
                    >
                        Create Course
                    </LoadingButton>
                </Box>
            </FormProvider>
        </Box>
    );
};

export default CreateCourse;
