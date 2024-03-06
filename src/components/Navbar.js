import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../action/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navigation = ({ logout, isAuthenticated }) => {
  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Navbar
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" className="nav-link">
            Home
          </Nav.Link>
          {isAuthenticated ? (
            <Nav.Link as={Link} to="/" onClick={logoutUser} className="nav-link">
              Logout
            </Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="nav-link">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup" className="nav-link">
                Signup
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navigation);
