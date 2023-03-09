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
    useFormContext,
  } from 'react-hook-form';
  import { object, string, z } from 'zod';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { LoadingButton } from '@mui/lab';
  import { useEffect } from 'react';
  import { pickBy } from 'lodash';
  import { toast } from 'react-toastify';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import { updateCourseFn } from '@/api/courseApi';
  import FileUploader from '@/components/layout/forms/inputs/FileUploader';
  import useHandleError from '@/services/hooks/useHandleError';
  
  
  const updateCourseSchema = object({ 
    code: string()
    .min( 1, 'El codi és obligatori' ),
    name: string()
    .min( 1, 'El titol és obligatori' )
    .max(70, 'El titol no pot ser més llarg de 70 caràcters'),
    description: string()
    .min(1, 'La descripció és obligatoria')
    }).partial();
  
  
  const UpdateCourse = ({ setOpenCourseModal, course }) => {
    const queryClient = useQueryClient();
    const { isLoading, mutate: updateCourse } = useMutation(
      ({ id, formData }) =>
        updateCourseFn({ id, formData }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['courses']);
          toast.success('Curs creat amb èxit');
          setOpenCourseModal(false);
        },
        onError: (error) => useHandleError(error),
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
          code: course.code,
          name: course.name,
          description: course.description,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course]);
  
    const onSubmitHandler = (values) => {
      console.log('hola')
      const formData = values
      const id = course.id;
      updateCourse({ id, formData });
    };

   
    return (
      <Box sx={{ bgcolor:'white' }}>
        <Box display='flex' justifyContent='space-between' sx={{ mb: 3 }}>
          <Typography variant='h5' component='h1'>
            Editar el curs
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
              label='Code'
              fullWidth
              sx={{ mb: '1rem', 
              bgcolor:'#E9F9FB'}}
              {...methods.register('code')}
            />
            <TextField
              label='Title'
              fullWidth
              sx={{ mb: '1rem', 
              bgcolor:'#E9F9FB' }}
              {...methods.register('name')}
            />
            <Controller
              name='description'
              control={methods.control}
              defaultValue=''
              render={({ field }) => (
                <TextareaAutosize
                  {...field}
                  placeholder='Descripció del curs'
                  minRows={8}
                  style={{
                    width: '100%',
                    backgroundColor:'#E9F9FB',
                    border: '1px solid #c8d0d4',
                    borderRadius: '4px',
                    fontFamily: 'Roboto, sans-serif',
                    outline: 'none',
                    fontSize: '1rem',
                    padding: '1rem',
                  }}
                />
              )}
            />
            <LoadingButton
              variant='contained'
              fullWidth
              sx={{ py: '0.8rem', 
              mt: 4, 
              backgroundColor: '#9EB423',
              borderRadius: 2,
              }}
              type='submit'
              loading={isLoading}
            >
              Editar
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    );
  };
  
  export default UpdateCourse;
  