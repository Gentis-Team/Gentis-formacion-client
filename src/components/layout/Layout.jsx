import React from 'react'
import  { Outlet } from 'react-router-dom'
import Header from '@/components/navigation/header/Header';
import Footer from '../Navigation/footer/Footer';


const Layout = ({children}) => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
        {children}
      <Footer/>
    </React.Fragment>
  )
}

export default Layout