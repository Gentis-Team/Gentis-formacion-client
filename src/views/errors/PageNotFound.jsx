import { Container, Box, Typography } from '@mui/material'
import React from 'react'

const PageNotFound = () => {
  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          pb: '50rem',
          mt: '2rem',
          height: '15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='h2'
          component='h1'
          sx={{ color: '#1f1e1e', fontWeight: 500 }}
        >
          Pagina no trobada
        </Typography>
      </Box>
    </Container>
  )
}

export default PageNotFound