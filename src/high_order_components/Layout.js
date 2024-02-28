import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkIsAuthenticated, loadUserDetails } from '../action/auth';


const Layout = ({checkIsAuthenticated, loadUserDetails, children}) => {

  useEffect( () => {
    checkIsAuthenticated();
    loadUserDetails();
  }, [checkIsAuthenticated, loadUserDetails])
  

  return (
    <div>
        <Navbar/>
        <main>
        { children }
        </main>
    </div>
  )
}

export default connect(null, { checkIsAuthenticated, loadUserDetails })(Layout);