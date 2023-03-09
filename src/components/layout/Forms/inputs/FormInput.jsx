import {
    FormHelperText,
    Typography,
    FormControl,
    Input as _Input,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';

const Input = styled( _Input )`
    background-color: white;
    padding: 0.4rem 0.7rem;
    margin-bottom: 0.5rem;
  `;

const FormInput = ( { name, label, ...otherProps } ) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={ control }
            defaultValue=''
            name={ name }
            render={ ( { field } ) => (
                <FormControl fullWidth sx={ { mb: 1 } }>
                    <Typography
                        variant='body2'
                        sx={ {
                            color: '#000',
                            mb: '2rem',
                            mt: '2rem',
                            fontWeight: 500,
                            fontSize: '1rem',
                        } }
                    >
                        { label }
                    </Typography>
                    <Input
                        { ...field }
                        fullWidth
                        disableUnderline
                        sx={ {
                            borderRadius: '.5rem'
                        } }
                        error={ !!errors[ name ] }
                        { ...otherProps }
                    />
                    <FormHelperText error={ !!errors[ name ] }>
                        { errors[ name ] ? errors[ name ].message : '' }
                    </FormHelperText>
                </FormControl>
            ) }
        />
    );
};

export default FormInput;
