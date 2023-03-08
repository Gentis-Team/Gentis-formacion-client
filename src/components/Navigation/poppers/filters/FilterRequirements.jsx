import React from 'react'
import { FormLabel, Radio, RadioGroup, FormControlLabel, Box, Typography} from '@mui/material';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

const FilterRequirements = (props) => {
  const { requirements, ...otherProps } = props;
  return (
    <React.Fragment>
      <Box sx={{ backgroundColor: 'background.filter'}}>
        <FormLabel component="legend" ><Box sx={{ display: "flex", alignItems: 'center', gap: 2, py: 1, px: 3 }}><AssignmentTurnedInOutlinedIcon /><Typography sx={{ fontWeight:'bold'}}>Requisits d'acces</Typography></Box></FormLabel>
      </Box>
      <RadioGroup
        sx={{ p: 3 }}
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        {...otherProps}
      >
        {requirements.map((requirement) => (
          <FormControlLabel key={requirement.id} value={requirement.name} control={<Radio />} label={requirement.name} />
        ))}
      </RadioGroup>
    </React.Fragment>
  )
}

export default FilterRequirements