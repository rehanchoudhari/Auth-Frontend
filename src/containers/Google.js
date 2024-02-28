import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { googleAuthenticate } from '../action/auth';


const Google = ({ googleAuthenticate }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect( () => {
    const value = queryString.parse(location.search);
    const state = value.state ? value.state : null;
    const code = value.code ? value.code : null;
    
    if(state && code){
      googleAuthenticate(state, code);
      navigate('/')
    }

  }, [navigate, googleAuthenticate, location])
  

  return (
    <div className="jumbotron">
        <h1 className="display-4">Wellcome to Auth System!</h1>
        <p className="lead">This is an incredible authentication system with product level features.</p>
        <hr className="my-4" />
        <p>Click the login button.</p>
        <p className="lead">
            <Link className="btn btn-primary btn-lg" to="/login" role="button">Login</Link>
        </p>
    </div>
  )
}

export default connect(null, { googleAuthenticate })(Google);