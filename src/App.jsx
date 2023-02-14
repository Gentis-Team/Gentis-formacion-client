import * as React from 'react';
import './App.css'
import { PublicRoute } from './routes'
import RadioGroup from '@mui/material/RadioGroup';
import RadioButton from './components/layout/Utils/Forms/RadioButton'
import FormLabel from '@mui/material/FormLabel';
import { ImportantDevices } from '@mui/icons-material';



function App() {

  return (
    <div className='boxUno'>
        <RadioButton 
          sx={{
            display: "flex",
            flexDirection:'column',
            justifyContent: "space-around",
            color: "black",
            bgcolor: "#F1F0F0",
            maxWidth: 300,
            height: 100,
            p: 4,
            
          }}
          titleGroup='Seu'
          Group='Girona'
          GroupDos='Barcelona'
          GroupTres='Tarragona'
          GroupCuatro='Salt'
        />

    </div>

  )
}

export default App
