import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function ButtonSubmit(props) {
  return (
    <Stack sx={props.styleButtonSubmit} direction="row" spacing={2}>
      <Button variant="contained" color="success" endIcon={<SendIcon />}>
        {props.buttonName}
      </Button>
    </Stack>
  );
}