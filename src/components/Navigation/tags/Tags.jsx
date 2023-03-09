import React from 'react'
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLocationsContext } from '@/services/providers/LocationsContextProvider';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {

  const backgroundColor =
    theme.palette.mode === 'light'
      ? '#E9F9FB'
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
})

const Tags = (props) => {
  const locationsContext = useLocationsContext();
  const locations = locationsContext.state.locations;

  const locationFound = locations.find(location => location.id === props.course.center.location_id);
  const group = props.course.groups.length > 0 ? props.course.groups[0].name : 'Per Tothom';


  return (
    <>
      <Breadcrumbs separator="" sx={{mt:1}} aria-label="breadcrumb" gap>
        <StyledBreadcrumb
          
          component="a"
          href="#"
          label={locationFound.location}
          icon={<LocationOnIcon fontSize="small" />}
        />
        <StyledBreadcrumb
          component="a"
          href="#"
          label={group}
          icon={<PeopleIcon fontSize="small" />}
        />


        <StyledBreadcrumb
          component="a"
          href="#"
          label={props.course.requirements.length > 0 ? 'Amb requisits' : 'Sense requisits'}
          icon={<AssignmentTurnedInIcon fontSize="small" />}
        />

        <StyledBreadcrumb
          component="a"
          href="#"
          label={props.course.start_date}
          icon={<CalendarMonthIcon fontSize="small" />}
        />
      </Breadcrumbs>

    </>

  )
}

export default Tags