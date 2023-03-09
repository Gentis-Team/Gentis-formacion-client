import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Textfield(props) {
  return (
    <Box
      component="form"
      sx={props.styleTextfield}
      noValidate
      autoComplete="off"
    >
      <TextField label={props.titulField} color="success" focused />
      
    </Box>
  );
}