import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';

import React, {useState, useEffect} from 'react'
import FilterLocations from './filters/FilterLocations';
import { useLocationsContext } from '@/services/providers/LocationsContextProvider';
import { useRequirementsContext } from '@/services/providers/RequirementsContextProvider';

import { Divider } from '@mui/material';
import FilterRequirements from './filters/FilterRequirements';
import FilterDuration from './filters/FilterDuration';

const durations = [
  {id: 1, description: 'Cursos breus (xx-xx hores)', name: 'short'},
  {id: 2, description: 'Cursos mitjans (xx-xx hores)', name: 'medium'},
  {id: 3, description: 'Cursos llargs (xx-xx hores)', name: 'long'}
]

const Filters = () => {
  const locationsContext = useLocationsContext();
  const requirementsContext = useRequirementsContext();

  const [selectedLocations, setSelectedLocations] = React.useState({});
  const [selectedRequirtement, setSelectedRequirtement] = React.useState('Sense titulacions');
  const [selectedDuration, setSelectedDuration] = React.useState({
    short: false,
    medium: false,
    long: false
  });

  const handleRequirementChange = (event) => {
    setSelectedRequirtement((event.target).value);
  };

  useEffect(() => {
    locationsContext.state.locations.map((location) => (
        selectedLocations[location.location.toLowerCase()] = false
      ))
  }, [])
  

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

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex'}}>
        <FormControl component="fieldset" variant="standard">
            <FilterLocations locations={locationsContext.state.locations} onChange={handleLocationsChange}/>
            <Divider/>
            <FilterRequirements 
              requirements={requirementsContext.state.requirements} 
              value={selectedRequirtement} 
              onChange={handleRequirementChange}
            />
            <Divider/>
            <FilterDuration durations={durations} onChange={handleDurationChange}/>
            <Divider/>

        </FormControl>
      </Box>
    </React.Fragment>
  )
}

export default Filters