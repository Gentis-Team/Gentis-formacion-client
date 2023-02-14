import * as React from 'react';
import './App.css'
import { PublicRoute } from './routes'
import RadioGroup from '@mui/material/RadioGroup';
import RadioButton from './components/layout/Utils/Forms/RadioButton'
import FormLabel from '@mui/material/FormLabel';
import { ImportantDevices } from '@mui/icons-material';
import NewCourse  from './components/layout/Forms/NewCourse.jsx';



function App() {

  return (
    <div >
        <NewCourse/>

    </div>

  )
}

export default App
