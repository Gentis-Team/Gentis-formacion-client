import * as React from 'react';
import './App.css'
import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes/Routes';
import DateInput from './components/layout/Forms/inputs/DateInput';

function App() {
  const content = useRoutes(routes);
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <DateInput sxDate={{width: 200, p:4}}/>
      {content}
    </>
  );
}

export default App;