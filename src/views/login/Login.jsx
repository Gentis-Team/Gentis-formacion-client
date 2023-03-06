import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/layout/forms/inputs/FormInput';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMeFn, loginUserFn } from '@/api/authApi';
import { useStateContext } from '@/services/providers/StateContextProvider';
import useHandleError from '@/services/hooks/useHandleError';
import { borderBottomColor } from '@mui/system';
import { useCategoriesContext } from '@/services/providers/CategoriesContextProvider';


const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #f9d13e;
  color: 'always.alwaysBlack';
  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #2363eb;
  &:hover {
    text-decoration: underline;
  }
`;

const loginSchema = object({
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});


const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const from = ((location.state)?.from.pathname) || '/';


  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  const stateContext = useStateContext();

    // API Get Current Logged-in user
  const query = useQuery(['authUser'], getMeFn, {
    enabled: false,
    select: (data) => data.user,
    retry: 1,
    onSuccess: (data) => {
      stateContext.dispatch({ type: 'SET_USER', payload: data });
    },
  });

    //  API Login Mutation
  const { mutate: loginUser, isLoading } = useMutation(
    (userData) => loginUserFn(userData),
    {
      onSuccess: () => {
        query.refetch();
        toast.success('You successfully logged in');
        navigate(from);
      },
      onError: (error) => useHandleError(error),
    }
  );

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler = (values) => {
        // ? Executing the loginUser Mutation
    loginUser(values);
  };

    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: 'always.alwaysWhite',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    textAlign='center'
                    component='h1'
                    sx={{
                        color: 'always.alwaysBlack',
                        fontWeight: 600,
                        fontSize: { xs: '2rem', md: '3rem' },
                        mb: 2,
                        letterSpacing: 1,
                    }}
                >
                    Admin Login
                </Typography>
                <Typography
                    variant='body1'
                    component='h2'
                    sx={{ color: '#e5e7eb', mb: 2 }}
                >
                    Login to have access!
                </Typography>

                <FormProvider {...methods}>
                    <Box
                        component='form'
                        onSubmit={handleSubmit(onSubmitHandler)}
                        noValidate
                        autoComplete='off'
                        maxWidth='27rem'
                        width='100%'
                        sx={{
                            backgroundColor: '#F4F8DD',
                            p: { xs: '1rem', sm: '2rem' },
                            borderRadius: 2,
                            border:' 2px solid #9EB423'
                        }}
                    >
                        <FormInput name='email' label='Email' type='email' />
                        <FormInput name='password' label='Contrasenya' type='password' />

                        <Typography
                            sx={{ fontSize: '0.9rem', mb: '1rem', textAlign: 'right' }}
                        >
                            <LinkItem to='/' style={{ color: 'always.alwaysBlack' }}>
                                Has oblidat la teva contrasenya?
                            </LinkItem>
                        </Typography>

                        <LoadingButton
                            variant='contained'
                            sx={{ mt: 1, color:'always.alwaysBlack', backgroundColor:'#9EB423', borderRadius: 4 }}
                            fullWidth
                            disableElevation
                            type='submit'
                            loading={isLoading}
                        >
                            Entrar
                        </LoadingButton>
                    </Box>
                    
                    <Box
                        mt={4}
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: 'always.alwaysWhite',
                        borderRadius: 2,
                        border:' 2px solid #9EB423'
                        }}>
                            <Typography sx={{ fontSize: '0.9rem', m: '0.5rem'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32"  height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M14.6666 9.33329H17.3333V12H14.6666V9.33329ZM14.6666 14.6666H17.3333V22.6666H14.6666V14.6666ZM16 2.66663C8.63996 2.66663 2.66663 8.63996 2.66663 16C2.66663 23.36 8.63996 29.3333 16 29.3333C23.36 29.3333 29.3333 23.36 29.3333 16C29.3333 8.63996 23.36 2.66663 16 2.66663ZM16 26.6666C10.12 26.6666 5.33329 21.88 5.33329 16C5.33329 10.12 10.12 5.33329 16 5.33329C21.88 5.33329 26.6666 10.12 26.6666 16C26.6666 21.88 21.88 26.6666 16 26.6666Z" fill="#78891A"/>
                            </svg></Typography>
                            <Typography sx={{ fontSize: '0.9rem', m: '0.5rem'}}>
                            Si no tens accés pots demanar-ho<LinkItem to='/register'> aquí</LinkItem>
                            </Typography>
                        </Box>
                </FormProvider>
            </Box>
        </Container>
    );
};

export default LoginPage;
