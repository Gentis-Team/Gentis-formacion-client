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
                        </Box>
                </FormProvider>
            </Box>
        </Container>
    );
};

export default LoginPage;
