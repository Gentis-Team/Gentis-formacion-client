import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function MaterialUIPickers(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack sx={props.sxDate} >
        <MobileDatePicker 
          name={props.name}
          inputFormat="MM/DD/YYYY"
          value={props.value}
          onChange={props.onChange}
          renderInput={(params) => <TextField {...params} />}
          
        />
      </Stack>
    </LocalizationProvider>
  );
}