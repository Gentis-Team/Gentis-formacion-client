import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Grid} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getAllCoursesFn } from '@/api/courseApi';
import FullScreenLoader from '@/components/layout/loaders/FullScreenLoader';
import CourseItem from '@/components/layout/content/CourseItem';
import Message from '@/components/messages/Message';
import Search from '@/components/navigation/search/Search';
import FilterPopper from '@/components/modals/FilterPopper';
import { useCoursesContext } from '@/services/providers/CoursesContextProvider';
import useHandleError from '@/services/hooks/useHandleError';
import {useQueryLocations, useQueryRequirements, useQueryGroups, useQueryCategories }from '@/services/hooks/useQuery';
const Home = () => {
  const coursesContext = useCoursesContext();

  const [query, setQuery] = useState(null);
  const { isLoading, data: courses } = useQuery(['courses'], () => getAllCoursesFn(), {
    select: (data) => data.courses,
    onSuccess: (data) => {
      coursesContext.dispatch({ type: 'SET_COURSES', payload: data });
    },
    onError: (error) => useHandleError(error),
  });

  useQueryLocations();
  useQueryRequirements();
  useQueryCategories();
  useQueryGroups();

  const handleOnSearch = (string, results) => {
    string.length > 0 ? setQuery(results) : setQuery(null);
  };

  const handleOnClear = () => {
    setQuery(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleFilterClick =
    (newPlacement) =>
    (event) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <Box sx={{ m: 1, pb: 8, px: 3, backgroundColor: "background.default" }}>
      <Box sx={{ py: 2 }}>
        <Search onSearch={handleOnSearch} onClear={handleOnClear} items={courses} />
      </Box>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={handleFilterClick('bottom-start')}>Filtra els cursos</Button>
        <Button onClick={handleFilterClick('bottom-end')}>Ordena per...</Button>
      </ButtonGroup>
      <FilterPopper open={open} anchorEl={anchorEl} placement={placement}/>
      
      {courses?.length === 0 || query?.length === 0 ? (
        <Box maxWidth='sm' sx={{ mx: 'auto', py: '5rem' }}>
          <Message type='info' title='Info'>
            No courses matching your search
          </Message>
        </Box>
      ) : (
        <Grid container>
          <Grid
            item
            md={2}
          />
          <Grid item container xs={12} spacing={2}>
            {!query ? courses?.map((course) => (
              <CourseItem key={course.id} course={course} />
            ))
              : query?.map((course) => (
                <CourseItem key={course.id} course={course} />
              ))}
          </Grid>

        </Grid>
      )}
    </Box>
  );
};

export default Home;
