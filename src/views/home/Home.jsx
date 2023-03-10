import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Grid, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getFilteredCoursesFn } from '@/api/courseApi';
import FullScreenLoader from '@/components/layout/loaders/FullScreenLoader';
import CourseItem from '@/components/layout/content/CourseItem';
import Message from '@/components/messages/Message';
import Search from '@/components/navigation/search/Search';
import FilterPopper from '@/components/modals/FilterPopper';
import { useCoursesContext } from '@/services/providers/CoursesContextProvider';
import useHandleError from '@/services/hooks/useHandleError';
import { useQueryLocations, useQueryRequirements, useQueryGroups, useQueryCategories, useQueryCenters } from '@/services/hooks/useQuery';
import { useFiltersContext } from '@/services/providers/FiltersContextProvider';
import { getAllCoursesFn } from '../../api/courseApi';
import Filters from '../../components/navigation/poppers/Filters';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const newTheme = createTheme();

newTheme.typography.h3 = {
  fontSize: '1.75rem',
  '@media (min-width:600px)': {
    fontSize: '4rem',
  },
  [newTheme.breakpoints.up('md')]: {
    fontSize: '4rem',
  },
};

const SButton = styled(Button)({
  backgroundColor: '#00545F',
  color: '#BED730'
})
const Home = () => {
  useQueryLocations();
  useQueryRequirements();
  useQueryCategories();
  useQueryGroups();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  /* A hook that is used to get the courses from the database. */
  const coursesContext = useCoursesContext();
  const filtersContext = useFiltersContext();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState(null);
  const { isLoading, data: courses } = useQuery(['courses'], () => getAllCoursesFn(), {

    select: (data) => data.courses,
    onSuccess: (data) => {

      coursesContext.dispatch({ type: 'SET_COURSES', payload: data });
    },
    onError: (error) => useHandleError(error),
  });






  //If the string is greater than 0, set the query to the results. If not, set the query to null.

  const handleOnSearch = (string, results) => {
    string.length > 0 ? setQuery(results) : setQuery(null);
  };

  const handleOnClear = () => {
    setQuery(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  /**
   * Sets anchor element to the event target and opens the popper.
   */
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
    <>

      <Grid container spacing={3} sx={{ display: 'flex', direction: 'row' }}>
        <Grid item xs>
          <ThemeProvider theme={newTheme}>
            <Typography variant='h3' sx={{ m: 1, px: 3, fontWeight: 'bold' }} >Troba el curs per a tu</Typography>
          </ThemeProvider>
        </Grid>
        <Grid m='1rem' >
          {matches && (
            <img src="/search.png" alt="lupa" />
          )}

        </Grid>

      </Grid>
      <Box sx={{
        m: 1, pb: 40, px: 3, '@media screen and (min-width: 600px)': {
          backgroundColor: "#F4F8DD"
        }
      }} >
        {!matches && (
          <>
            <Box sx={{ py: 2 }}>
              <Search onSearch={handleOnSearch} onClear={handleOnClear} items={courses} />
            </Box>

            <ButtonGroup sx={{ mb: 2 }} fullWidth variant="contained" aria-label="outlined primary button group">
              <SButton onClick={handleFilterClick('bottom-start')}>Filtra els cursos</SButton>
              <SButton onClick={handleFilterClick('bottom-end')}>Ordena per...</SButton>
            </ButtonGroup>
          </>
        )}
        <FilterPopper handleClose={setOpen} open={open} anchorEl={anchorEl} placement={placement} />
        {courses?.length === 0 || query?.length === 0 && !matches ?  (
          <Box maxWidth='sm' sx={{ mx: 'auto', py: '5rem' }}>
            <Message type='info' title='Info'>
              No courses matching your search
            </Message>
          </Box>
        ) : (
          <Grid container paddingTop={5}>
            <Grid item container xs={12} md={8} spacing={2}>
            {
              courses?.length === 0 || query?.length === 0 && matches ? (
                <Box maxWidth='sm' sx={{ mx: 'auto', py: '5rem' }}>
                  <Message type='info' title='Info'>
                    No courses matching your search
                  </Message>
                </Box>
              ) : (
              !query ? courses?.map((course) => (

                <CourseItem key={course.id} course={course} />
              ))
                : query?.map((course) => (
                  <CourseItem key={course.id} course={course} />
                )))}
            </Grid>
            {matches && (

              <Grid item container md={3} sx={{justifyContent: 'end', flexDirection: 'row', ml: 10 }}>
                <Grid item  xs={12} paddingY={2}>
                  <Search onSearch={handleOnSearch} onClear={handleOnClear} items={courses} />                </Grid>
                <Grid sx={{ backgroundColor: 'white', borderRadius: '20px'  }}>
                  <Filters />
                </Grid>

              </Grid>

            )}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Home;
