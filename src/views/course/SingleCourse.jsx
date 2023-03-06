import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import Header from '../../components/Navigation/header/Header'

const SingleCourse = () => {
  return (
    <Container
      maxWidth='lg'
      sx={ {
        backgroundColor: 'blue.100',
        
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'left',
        justifyContent: 'left',
        
        padding: '16px',
      } }
    >
      <Box
        sx={ {
          backgroundColor: 'blue.100',
          
          display: 'flex',
          flexDirection: 'column',
          
          flexGrow: 1,
        } }
      >
        <Typography
          variant='p'
          component='p'
          sx={ { color: 'blue.500', fontWeight: 500 } }
        >
          Altres informacions
        </Typography>

      </Box>
      <Box
        sx={ {
          backgroundColor: 'blue.100',
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 3,
        } }
      >
        <Typography
          variant='h4'
          component='h4'
          sx={ { color: 'blue.500', fontWeight: 500 } }
        >
          Operacions auxiliars d’enregistrament i tractament de dades i documents          </Typography>
      </Box>
    </Container>
  )
}

export default SingleCourse