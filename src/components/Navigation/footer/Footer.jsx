import { BottomNavigation, Button, ButtonBase, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Footer = () => {
  return (
      <BottomNavigation sx={{
        width: '100%',
        display: 'flex', 
        justifyContent: 'space-around', 
        backgroundColor: '#734547',
        alignItems: 'center'}}>
        <Box>© Gentis 2023</Box>
        
      </BottomNavigation>
  )
}

export default Footer