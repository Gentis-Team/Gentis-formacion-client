import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Checkboxes(props) {
  return (
    <div>
     <FormGroup sx={props.checkStile}>
      <FormControlLabel control={<Checkbox defaultChecked color="success" />} label={props.name}/>
    </FormGroup> 
    </div>
  );
}