import React from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel, Box, Typography } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
const FilterDuration = (props) => {
    const { durations, ...otherProps } = props;
    return (
        <React.Fragment>
            <Box sx={{ backgroundColor: 'background.filter', }}>
                <FormLabel component="legend" ><Box sx={{ display: "flex", alignItems: 'center', gap: 2, py: 1, px: 3 }}><CalendarMonthOutlinedIcon /><Typography sx={{ fontWeight:'bold'}}>Durada</Typography></Box></FormLabel>
            </Box>
            <FormGroup sx={{ p: 3 }} >
                {durations.map((duration) => (
                    <FormControlLabel
                        key={duration.id}
                        control={
                            <Checkbox {...otherProps} name={duration.name} />
                        }
                        label={duration.description}
                    />
                ))}
            </FormGroup>
        </React.Fragment>
    )
}

export default FilterDuration