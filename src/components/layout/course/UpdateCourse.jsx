import {
    Box,
    CircularProgress,
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
  import { pickBy } from 'lodash';
  import { toast } from 'react-toastify';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import { updateCourseFn } from '@/api/courseApi';
  import FileUploader from '@/components/layout/utils/FileUploader';
  
  
  const updateCourseSchema = object({
    name: string().max(70),
    category: string(),
    description: string(),
    //image: z.instanceof(File),
  }).partial();
  
  
  const UpdateCourse = ({ setOpenCourseModal, course }) => {
    const queryClient = useQueryClient();
    const { isLoading, mutate: updateCourse } = useMutation(
      ({ id, formData }) =>
        updateCourseFn({ id, formData }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['courses']);
          toast.success('Course updated successfully');
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
      resolver: zodResolver(updateCourseSchema),
    });
  
    const {
      formState: { isSubmitting },
    } = methods;
  
    useEffect(() => {
      if (isSubmitting) {
        methods.reset();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitting]);
  
    useEffect(() => {
      if (course) {
        methods.reset({
          name: course.name,
          category: course.category,
          description: course.description,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course]);
  
    const onSubmitHandler = (values) => {
      /* const formData = new FormData();
      const filteredFormData = pickBy(
        values,
        (value) => value !== '' && value !== undefined
      );
      const { image, ...otherFormData } = filteredFormData;
      if (image) {
        formData.append('image', image);
      }
      formData.append('data', JSON.stringify(otherFormData)); */
      const formData = values
      const id = course.id;
      updateCourse({ id, formData });
    };
  
    return (
      <Box>
        <Box display='flex' justifyContent='space-between' sx={{ mb: 3 }}>
          <Typography variant='h5' component='h1'>
            Edit Course
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
              label='Title'
              fullWidth
              sx={{ mb: '1rem' }}
              {...methods.register('name')}
            />
            <TextField
              label='Category'
              fullWidth
              sx={{ mb: '1rem' }}
              {...methods.register('category')}
            />
            <Controller
              name='description'
              control={methods.control}
              defaultValue=''
              render={({ field }) => (
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
                    
                  }}
                />
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
              Edit Course
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    );
  };
  
  export default UpdateCourse;
  