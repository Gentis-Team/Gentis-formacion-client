import React from 'react'
import { Popper, Fade, Typography, Paper } from '@mui/material';
import Filters from '../navigation/poppers/Filters';
import OrderBy from '../navigation/poppers/OrderBy';


const FilterPopper = (props) => {
    const {handleClose, ...otherProps} = props;
    return (
        <Popper {...otherProps} transition style={{ width: 350 }}>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                        {props.placement === 'bottom-start' ? 
                            <Filters handleClose={handleClose}/>
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