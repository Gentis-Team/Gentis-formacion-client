import { FormControlLabel, Radio } from '@mui/material'
import React from 'react'

const CategoriesRadios = (props) => {
    const { value, ...otherProps } = props
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
                    value={value}
                />
            }
            {...otherProps}
        />
    )
}

export default CategoriesRadios