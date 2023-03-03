import { FormControlLabel, Radio } from '@mui/material'
import React from 'react'

const CategoriesRadios = (props) => {
    return (
        <FormControlLabel 
            
            control={
                <Radio
                    sx={{
                        color: "black",
                        "&.Mui-checked": {
                            color: "#BED730",
                        },
                    }}
                />
            }
            {...props}
        />
    )
}

export default CategoriesRadios