import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/layout/forms/inputs/FormInput';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { signUpUserFn } from '@/api/authApi';

const LoadingButton = styled( _LoadingButton )`
  padding: 0.6rem 0;


  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;

const LinkItem = styled( Link )`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const registerSchema = object( {
  name: string().min( 1, 'Full name is required' ).max( 100 ),
  email: string()
    .min( 1, 'Email address is required' )
    .email( 'Email Address is invalid' ),
  phone: string()
    .min( 1, 'Phone number is required' ),
  role: string()
    .min( 1, 'Role is required' ),
  password: string()
    .min( 1, 'Password is required' )
    .min( 8, 'Password must be more than 8 characters' )
    .max( 32, 'Password must be less than 32 characters' ),
  passwordConfirm: string().min( 1, 'Please confirm your password' ),
} ).refine( ( data ) => data.password === data.passwordConfirm, {
  path: [ 'passwordConfirm' ],
  message: 'Passwords do not match',
} );

const RegisterPage = () => {
  const navigate = useNavigate();

  const methods = useForm( {
    resolver: zodResolver( registerSchema ),
  } );

  // ? Calling the Register Mutation
  const { mutate, isLoading } = useMutation(
    ( userData ) => signUpUserFn( userData ),
    {
      onSuccess ( data ) {
        toast.success( data?.message );
        navigate( '/' );
      },
      onError ( error ) {
        if ( Array.isArray( ( error ).response.data.error ) ) {
          ( error ).response.data.error.forEach( ( el ) =>
            toast.error( el.message, {
              position: 'top-right',
            } )
          );
        } else {
          toast.error( ( error ).response.data.message, {
            position: 'top-right',
          } );
        }
      },
    }
  );

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect( () => {
    if ( isSubmitSuccessful ) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isSubmitSuccessful ] );

  const onSubmitHandler = ( values ) => {
    // ? Execute the Mutation
    mutate( values );
  };

  return (
    <Container
      maxWidth={ false }
      sx={ {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#fff',
      } }
    >
      <Box
        sx={ {
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'left',
          flexDirection: 'column',
          mb: '2rem'
        } }
      >
        <Typography
          textAlign='left'
          component='h1'
          sx={ {
            color: '#000',
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 800,
            mt: 2,
            mb: 2,
            letterSpacing: -1,
          } }
        >
          Nou Admin
        </Typography>

        <FormProvider { ...methods }>
          <Box
            component='form'
            onSubmit={ handleSubmit( onSubmitHandler ) }
            noValidate
            autoComplete='off'
            maxWidth='27rem'
            width='100%'
            sx={ {
              backgroundColor: '#F4F8DD',
              p: '1rem',
              borderRadius: '1rem',
              boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
              border: '2px solid #9eb424',
            } }
          >
            <FormInput name='name' label='Nom' />
            <FormInput name='name' label='Cognoms' />
            <FormInput name='role' label='D.N.I' />
            <FormInput name='email' label='Email' type='email' />
            <FormInput name='password' label='Contrasenya' type='password' />
            <FormInput
              name='passwordConfirm'
              label='Confirmar contrasenya'
              type='password'
            />

            <LoadingButton
              variant='contained'
              sx={ {
                mt: 1,
                backgroundColor: '#BED730',
                borderRadius: '1rem',
              } }
              fullWidth
              disableElevation
              type='submit'
              loading={ isLoading }
            >
              Desa
            </LoadingButton>
            <Box
              mt={ 4 }
              sx={ {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderRadius: '1rem',
                border: '2px solid #9eb424',
              } }>
              <Typography sx={ {
                fontSize: '0.9rem',
                m: '1rem'
              } }>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M14.6666 9.33329H17.3333V12H14.6666V9.33329ZM14.6666 14.6666H17.3333V22.6666H14.6666V14.6666ZM16 2.66663C8.63996 2.66663 2.66663 8.63996 2.66663 16C2.66663 23.36 8.63996 29.3333 16 29.3333C23.36 29.3333 29.3333 23.36 29.3333 16C29.3333 8.63996 23.36 2.66663 16 2.66663ZM16 26.6666C10.12 26.6666 5.33329 21.88 5.33329 16C5.33329 10.12 10.12 5.33329 16 5.33329C21.88 5.33329 26.6666 10.12 26.6666 16C26.6666 21.88 21.88 26.6666 16 26.6666Z" fill="#78891A" />
                </svg>
              </Typography>
              <Typography sx={ {
                fontSize: '0.9rem',
                m: '1rem'
              } }>
                El nou administrador rebrá un email amb una contrasenya temporanea. Aquí el llistat dels administradors.
              </Typography>
            </Box>
            <Typography sx={ {
              fontSize: '0.9rem',
              color: '#000',
              textAlign: 'center',
              mt: '1rem'
            } }>
              Ja tens compte?{ ' ' }Entra
              <LinkItem to='/login'> aquí</LinkItem>
            </Typography>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default RegisterPage;
