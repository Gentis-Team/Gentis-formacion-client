import * as React from 'react';
import './App.css'
import  CssBaseline  from '@mui/material/CssBaseline';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes/Routes';

function App() {
  const content = useRoutes(routes);
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      {content}
    </>
  );
}

export default App;