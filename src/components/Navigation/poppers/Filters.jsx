import {Box, Button} from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';

import React, {useState, useEffect} from 'react'
import FilterLocations from './filters/FilterLocations';
import { useLocationsContext } from '@/services/providers/LocationsContextProvider';
import { useRequirementsContext } from '@/services/providers/RequirementsContextProvider';

import { Divider } from '@mui/material';
import FilterRequirements from './filters/FilterRequirements';
import FilterDuration from './filters/FilterDuration';
import { LoadingButton } from '@mui/lab';
import { useFiltersContext } from '@/services/providers/FiltersContextProvider';
import { useFilteredCoursesContext } from '../../../services/providers/FilteredCoursesProvider';
import { useCoursesContext } from '@/services/providers/CoursesContextProvider';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getFilteredCoursesFn } from '@/api/courseApi';
import { toast } from 'react-toastify';




const durations = [
  {id: 1, description: 'Cursos breus (xx-xx hores)', name: 'short'},
  {id: 2, description: 'Cursos mitjans (xx-xx hores)', name: 'medium'},
  {id: 3, description: 'Cursos llargs (xx-xx hores)', name: 'long'}
]

const Filters = (props) => {
  const locationsContext = useLocationsContext();
  const requirementsContext = useRequirementsContext();
  const filtersContext = useFiltersContext();
  const filteredCoursesContext = useFilteredCoursesContext();
  const coursesContext = useCoursesContext();
  const queryClient = useQueryClient();

  const { isLoading, mutate: fetchFilterCourses } = useMutation(
    ({ formData }) =>
      getFilteredCoursesFn({ formData }),
    {
      select: (data) => data.courses,
      onSuccess: (data) => {
        filteredCoursesContext.dispatch({ type: 'SET_FILTERED_COURSES', payload: data });
        toast.success('Courses filtered successfully');
      },
      onError: (error) => useHandleError(error),
    }
  );
  

  const [selectedLocations, setSelectedLocations] = React.useState({});
  const [selectedRequiretement, setSelectedRequiretement] = React.useState('Sense titulacions');
  const [selectedDuration, setSelectedDuration] = React.useState({
    short: false,
    medium: false,
    long: false
  });

  const [selectedInputs, setSelectedInputs] = React.useState({
    locations: selectedLocations,
    requirement: selectedRequiretement,
    duration: selectedDuration
  });

  useEffect(() => {
    setSelectedInputs({
      locations: selectedLocations,
      requirement: selectedRequiretement,
      duration: selectedDuration
    })
  }, [])
  


  const handleRequirementChange = (event) => {
    setSelectedRequirtement((event.target).value);
  };

  useEffect(() => {
    locationsContext.state.locations.map((location) => (
        selectedLocations[location.location.toLowerCase()] = false
      ))
  }, [])
  
  /**
   * When the user clicks on a checkbox, update the state of the selectedLocations object with the name
   * of the checkbox and the value of the checkbox.
   */
  const handleLocationsChange = (event) => {
    setSelectedLocations({
      ...selectedLocations,
      [event.target.name]: event.target.checked,
    });
  }; 
  
  const handleDurationChange = (event) => {
    setSelectedDuration({
      ...selectedDuration,
      [event.target.name]: event.target.checked,
    });
  }; 
  

  const handleSubmit = (e) => {
      e.preventDefault();

      //filtersContext.dispatch({ type: 'SET_FILTERS', payload: selectedInputs });

        
          // const locationsFound = Object.entries(selectedLocations).filter(obj => obj[1])
          // const filteredLocations = locationsFound.map(loc => {
          //   return locationsContext.state.locations.filter(location => location.location.toLowerCase() === location[0]);
          // })          
          // const filteredCourses = coursesContext.state.courses.filter(course => course.center.location_id === filteredLocations[0][0].id)
      //filteredCoursesContext.dispatch({ type: 'SET_FILTERED_COURSES', payload: selectedInputs });

      filterCourses(selectedInputs)
  };


const filterCourses = (formData) => { 
  filtersContext.dispatch({ type: 'SET_FILTERS', payload: formData });
  fetchFilterCourses({ formData });
  props.handleClose(false)
}

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection:'column'}} component={'form'} onSubmit={handleSubmit}>
        <FormControl component="fieldset" variant="standard" >
            <FilterLocations locations={locationsContext.state.locations} onChange={handleLocationsChange}/>
            <FilterRequirements 
              requirements={requirementsContext.state.requirements} 
              value={selectedRequiretement} 
              onChange={handleRequirementChange}
            />
            <FilterDuration durations={durations} onChange={handleDurationChange}/>
        </FormControl>
        <LoadingButton
              sx={{ width:'50%', py: '0.8rem', backgroundColor: '#9EB423', color:'#000' }}
              type='submit'
            >
              Cerca els cursos 
            </LoadingButton>
            <Button sx={{ bgcolor: '#000000'}}></Button>
      </Box>
    </React.Fragment>
  )
}

export default Filters