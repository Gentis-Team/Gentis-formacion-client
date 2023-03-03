import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {Box} from "@mui/material";



export default function TimeInput(props) {
  return (
    <Stack 
    direction='row'
      sx={props.sxTime}
    >
      <TextField
        id="time"
        label={props.tituloClock} 
        type="time"
        defaultValue="00:00"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 110,}}
        
      />
      <Box sx={{ m: 2 }}>{props.de}</Box>
      <TextField
        id="time"
        label={props.tituloClockDos}
        type="time"
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 110 }}
      />
    </Stack>
  );
}
