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


const registerSchema = object({
  name: string().min(1, 'El nom complet és obligatori').max(100),
  email: string()
    .min(1, 'L\'email és obligatori')
    .email('L\'email és incorrecte'),
  phone: string()
    .min(1, 'El telèfon és obligatori'),
  role: string()
    .min(1, 'El rol és obligatori'),
  password: string()
    .min(1, 'La contrasenya és obligatoria')
    .min(8, 'La contrasenya ha de tenir més de 8 caràcters')
    .max(32, 'La contrasenya ha de tenir menys de 32 caràcters'),
  passwordConfirm: string().min(1, 'Si us plau, confirmeu la vostra contrasenya'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Les contrasenyes no coincideixen',
});


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
            <FormInput name='role' label='Rol' />
            <FormInput name='phone' label='Telefon' />
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
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default RegisterPage;
