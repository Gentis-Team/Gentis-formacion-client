import { BottomNavigation, Button, ButtonBase, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

const handleClick = () => {
  window.open( 'https://www.gentis.org/fundacio-gentis/' )
}

const handleClick2 = () => {
  window.open( 'https://www.gentis.org/politica-gentis/' )
}

const handleClick3 = () => {
  window.open( 'https://www.gentis.org/' )
}

const Footer = () => {
  return (

      <BottomNavigation   component="footer" sx={{
      width: '100%',
      
      bottom: 0,
        display: 'flex', 
        justifyContent: 'space-around', 
        backgroundColor: 'primary.main',
        color: 'white',
        alignItems: 'center'}}>
        <Box>© Gentis 2023</Box>
        
        <Button onClick={handleClick3}>
          <img src="../../logo-Gentis-blanc-800px-768x279 1.png" alt="Gentis" />
        </Button>
      </BottomNavigation>

  )
}

export default Footer