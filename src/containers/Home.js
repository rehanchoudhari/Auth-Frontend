import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {


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
};

export default Home;