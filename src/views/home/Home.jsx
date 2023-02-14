
import { Box, Container, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getAllCoursesFn } from '@/api/courseApi';
import FullScreenLoader from '@/components/FullScreenLoader';
import CourseItem from '@/components/layout/course/CourseItem';
import Message from '@/components/layout/messages/Message';
import Layout from '@/components/layout/Layout';

const Home = () => {
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

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <Layout>
      <Container
        maxWidth={false}
        sx={{ backgroundColor: '#555555', minHeight: '100vh' }}
      >
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
            maxWidth='lg'
            sx={{ margin: '0 auto', pt: '5rem' }}
          >
            {courses?.map((course) => (
              <CourseItem key={course.id} course={course} />
            ))}
          </Grid>
        )}
      </Container>
    </Layout>
  
  );
};

export default Home;
 