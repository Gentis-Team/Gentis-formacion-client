import React from 'react'
import { Popper, Fade, Typography, Paper } from '@mui/material';
import Filters from '../navigation/poppers/Filters';
import OrderBy from '../navigation/poppers/OrderBy';


const FilterPopper = (props) => {
    return (
        <Popper {...props} transition style={{ width: 350 }}>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                        {props.placement === 'bottom-start' ? 
                            <Filters/>
                            :
                            <OrderBy/>
                        }
                    </Paper>
                </Fade>
            )}
        </Popper>
    )
}

export default FilterPopper