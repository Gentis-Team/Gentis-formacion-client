import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButton(props) {
    return (
           
                <FormControl >
                    < FormLabel color="success" id='demo-radio-buttons-group-label'
                        sx={{
                            color:'black',
                            fontWeight: 500,
                            fontSize: 24, 
                          }}
                    >{props.titleGroup}</ FormLabel>
                    <RadioGroup 
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="female"
                        name="radio-buttons-group"
                        sx={{
                            
                            color:'black',
                            bgcolor:'#F1F0F0',
                            p:2, 
                          }}
                    >
                        <FormControlLabel  value={props.Group} control={<Radio color="success" sx={{color:'black',}} />} label={props.Group} />
                        <FormControlLabel value={props.GroupDos}  control={<Radio color="success" sx={{color:'black',}}/>} label={props.GroupDos} />
                        <FormControlLabel value={props.GroupTres}  control={<Radio color="success" sx={{color:'black',}} />} label={props.GroupTres} />
                        <FormControlLabel value={props.GroupCuatro}  control={<Radio color="success" sx={{color:'black',}}/>} label={props.GroupCuatro} />
                    </RadioGroup> 

                </FormControl>
           
       
    );
}

