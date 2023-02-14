import React from 'react'
import RadioButton from './inputs/RadioButton'


export default function NewCourse()  {
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
