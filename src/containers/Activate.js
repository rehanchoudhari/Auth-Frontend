import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { activateAccountThroughEmail } from '../action/auth';

const Activate = ({ activateAccountThroughEmail }) => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  const handleClick = (uid, token) => {
    activateAccountThroughEmail(uid, token);
    setVerified(true)
  }

  if(verified){
    return navigate('/login');
  }

  return (
    <div className='container mt-5'>
        <h1>Click Below Button To Activate Your Account!</h1>
        <button className='btn btn-primary' type='submit' onClick={()=>handleClick(uid, token)}>Activate</button>
    </div>
  )
};

export default connect(null, { activateAccountThroughEmail })(Activate);