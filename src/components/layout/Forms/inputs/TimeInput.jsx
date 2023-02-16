import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";



export default function TimeInput(props) {
  return (
    <Stack 
      component="form" 
      sx={{
        displa: "flex",
        flexDirection: "row",
        p: 2,
        label:{color:'green'},
        '& input': { color: 'black' },
        TextField:{color:'black'},
        time:{color:'black'},
        bgcolor:'white'
      }}
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
