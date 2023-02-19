import React from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel, Grid } from '@mui/material';
import { Box } from '@mui/system';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const FilterLocations = (props) => {
  const { locations, ...otherProps } = props;
  return (
    <React.Fragment>
      <Box sx={{ backgroundColor: 'background.filter', }}>
        <FormLabel component="legend" ><Box sx={{ display: "flex", alignItems: 'center', gap: 2, py: 1, px: 3 }}><LocationOnOutlinedIcon />Seu del curs</Box></FormLabel>
      </Box>
      <FormGroup sx={{ p: 3 }} >
        <Grid container>
          {locations.map((location) => (
            <Grid key={location.id} item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox {...otherProps} name={location.location.toLowerCase()} />
                }
                label={location.location}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </React.Fragment>
  )
}

export default FilterLocations