import * as React from 'react';
import './App.css'
import { PublicRoute } from './routes'
import RadioGroup from '@mui/material/RadioGroup';
import RadioButton from './components/layout/Utils/Forms/RadioButton'
import FormLabel from '@mui/material/FormLabel';



function App() {

  return (
    <div className='boxUno'>
      <FormLabel sx={{
        color: 'black',
        fontWeight: 500,
        fontSize: 24,
      }}>Seu</FormLabel>
      <RadioButton
        Group='Girona'
        GroupDos='Barcelona'
        GroupTres='Tarragona'
        GroupCuatro='Salt'
      />
    </div>

  )
}

export default App
