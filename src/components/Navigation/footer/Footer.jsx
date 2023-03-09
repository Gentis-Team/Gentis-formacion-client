import { BottomNavigation, Button, ButtonBase, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';


const newTheme = createTheme();

newTheme.typography.body1 = {
  fontSize: '0.5rem',
  '@media (min-width:600px)': {
    fontSize: '0.75rem',
  },
  [newTheme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
};


const Footer = () => {
  const handleClick = (event) => {
    switch (event.target.id) {
      case 'buttonLegal':
        window.open('https://www.gentis.org/fundacio-gentis/')
        break;
      case 'buttonPrivacyPolicy':
        window.open('https://www.gentis.org/politica-gentis/')
        break;
      case 'buttonLogo':
        window.open('https://www.gentis.org/')
        break;
      default:
        break;
    }
  }

  return (

    <BottomNavigation component="footer" sx={{
      width: '100%',

      bottom: 0,
      display: 'flex',
      justifyContent: 'space-around',
      backgroundColor: 'primary.main',
      color: 'white',
      alignItems: 'center'
    }}>
      <ThemeProvider theme={newTheme}>
        <Box><Typography variant='body1'>© Gentis 2023</Typography></Box>
        <Box id='buttonLegal' onClick={handleClick}><Typography variant='body1'>Avís legal</Typography></Box>
        <Box id='buttonPrivacyPolicy' onClick={handleClick}><Typography variant='body1'>Política de Privacitatl</Typography></Box>
      </ThemeProvider>
      <Box>
        <img id='buttonLogo' onClick={handleClick} src="../../logo-Gentis-blanc-800px-768x279 1.png" alt="Gentis" />
      </Box>
    </BottomNavigation>

  )
}

export default Footer