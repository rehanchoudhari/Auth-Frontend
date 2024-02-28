import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../action/auth';

const Navbar = ({ logout, isAuthenticated }) => {
    const navigate = useNavigate();
    const logoutUser = () => {
      logout();
    }


    React.useEffect(() => {
      if(isAuthenticated){
        navigate('/')
      }
    }, [isAuthenticated, navigate])

    const guestLink = () =>(
        <>
          <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/signup">Signup</Link>
          </li>
        </>
    )

    const authLink = () => (
        <li className="nav-item">
            <Link className="nav-link" to='/' onClick={() => logoutUser()}>Logout</Link>
        </li>
    )

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Navbar</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
          </li>
          { isAuthenticated ? authLink() : guestLink()}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar);
