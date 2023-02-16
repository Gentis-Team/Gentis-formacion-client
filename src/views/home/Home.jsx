import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getAllCoursesFn } from '@/api/courseApi';
import FullScreenLoader from '@/components/layout/loaders/FullScreenLoader';
import CourseItem from '@/components/layout/content/CourseItem';
import Message from '@/components/messages/Message';
import Search from '@/components/navigation/search/Search';

const Home = () => {
  const [query, setQuery] = useState(null);
  const { isLoading, data: courses } = useQuery(['courses'], () => getAllCoursesFn(), {
    select: (data) => data.courses,
    onError: (error) => {
      if (Array.isArray((error).data.error)) {
        (error).data.error.forEach((el) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error).data.message, {
          position: 'top-right',
        });
      }
    },
  });
  
  const handleOnSearch = (string, results) => {
    string.length > 0 ? setQuery(results) : setQuery(null);
  };

  const handleOnClear = () => {
    setQuery(null);
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
      <Container
        maxWidth={false}
        sx={{ backgroundColor: '#555555', minHeight: '100vh' }}
      >
        <Search onSearch={handleOnSearch} onClear={handleOnClear} items={courses}/>
        {courses?.length === 0 ? (
          <Box maxWidth='sm' sx={{ mx: 'auto', py: '5rem' }}>
            <Message type='info' title='Info'>
              No courses at the moment
            </Message>
          </Box>
        ) : (
          <Grid
            container
            rowGap={5}
          >
            {!query ? courses?.map((course) => (
              <CourseItem key={course.id} course={course} />
            ))
          : query?.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
          </Grid>
        )}
      </Container>
  );
};

export default Home;
 