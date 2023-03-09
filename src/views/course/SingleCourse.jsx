import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import Header from '../../components/Navigation/header/Header'
import { useParams } from 'react-router-dom'
import useHandleError from '@/services/hooks/useHandleError';
import { useQuery } from '@tanstack/react-query';
import FullScreenLoader from '@/components/layout/loaders/FullScreenLoader';
import { getCourseFn } from '@/api/courseApi';


const SingleCourse = () => {
  const courseId = useParams().id;

  const { isLoading, data: course } = useQuery(['course'], () => getCourseFn(courseId), {

    select: (data) => data.course,
    onError: (error) => useHandleError(error),
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <Container
      maxWidth='lg'
      sx={{
        backgroundColor: 'blue.100',

        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'left',
        justifyContent: 'left',

        padding: '16px',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'blue.100',

          display: 'flex',
          flexDirection: 'column',

          flexGrow: 1,
        }}
      >
        <Typography
          variant='p'
          component='p'
          sx={{ color: 'blue.500', fontWeight: 500 }}
        >
          Altres informacions
        </Typography>

      </Box>
      <Box
        sx={{
          backgroundColor: 'blue.100',
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 3,
        }}
      >
        <Typography
          variant='h4'
          component='h4'
          sx={{ color: 'blue.500', fontWeight: 500 }}
        >
          {course.name}
        </Typography>
      </Box>
    </Container>
  )
}

export default SingleCourse