import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { flexbox } from "@mui/system";

export default function RadioButton(props) {
  return (
    <FormControl>
      <FormLabel
        color="success"
        id="demo-radio-buttons-group-label"
        sx={{
          color: "black",
          fontWeight: 500,
          fontSize: 24,
        }}
      >
        {props.titleGroup}
      </FormLabel>
      <RadioGroup sx={props.sxStile}
        aria-labelledby="demo-radio-buttons-group-label"
        // defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value={props.Group}
          control={<Radio color="success" sx={{ color: "black" }} />}
          label={props.Group}
        />
      </RadioGroup>
    </FormControl>
  );
}
